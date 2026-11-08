#include <arpa/inet.h>
#include <poll.h>
#include <sys/socket.h>
#include <unistd.h>

#include <chrono>
#include <cstdio>
#include <cstdlib>
#include <cstring>

int main(int argc, char** argv) {
    if (argc < 2) {
        std::fprintf(stderr, "usage: %s <node_id 1-3>\n", argv[0]);
        return 1;
    }
    const int id = std::atoi(argv[1]);
    if (id < 1 || id > 3) {
        std::fprintf(stderr, "node_id must be 1, 2, or 3\n");
        return 1;
    }

    const int BASE_PORT = 15000;  // node N listens on 15000 + N
    int sock = socket(AF_INET, SOCK_DGRAM, 0);

    sockaddr_in me{};
    me.sin_family = AF_INET;
    me.sin_addr.s_addr = htonl(INADDR_LOOPBACK);
    me.sin_port = htons(BASE_PORT + id);
    if (bind(sock, reinterpret_cast<sockaddr*>(&me), sizeof(me)) < 0) {
        std::perror("bind (is this node already running?)");
        return 1;
    }

    using clock = std::chrono::steady_clock;
    auto last_send = clock::now() - std::chrono::seconds(1);
    int seq = 0;

    std::printf("Node %d listening on port %d\n", id, BASE_PORT + id);

    while (true) {
        // Wait up to 100 ms for an incoming packet
        pollfd p{sock, POLLIN, 0};
        if (poll(&p, 1, 100) > 0 && (p.revents & POLLIN)) {
            char buf[256];
            ssize_t n = recv(sock, buf, sizeof(buf) - 1, 0);
            if (n > 0) {
                buf[n] = '\0';
                std::printf("Node %d received: %s\n", id, buf);
            }
        }

        // Once per second, send a packet to the other two nodes
        if (clock::now() - last_send >= std::chrono::seconds(1)) {
            char msg[64];
            std::snprintf(msg, sizeof(msg), "from=%d seq=%d", id, seq++);
            for (int peer = 1; peer <= 3; ++peer) {
                if (peer == id) continue;
                sockaddr_in to{};
                to.sin_family = AF_INET;
                to.sin_addr.s_addr = htonl(INADDR_LOOPBACK);
                to.sin_port = htons(BASE_PORT + peer);
                sendto(sock, msg, std::strlen(msg), 0,
                       reinterpret_cast<sockaddr*>(&to), sizeof(to));
            }
            last_send = clock::now();
        }
    }
}
