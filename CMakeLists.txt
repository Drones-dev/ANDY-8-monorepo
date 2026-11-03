cmake_minimum_required(VERSION 3.16)
project(andy8_mesh_routing LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

include(CTest)

add_library(andy8_routing
  src/routing.cpp
)
target_include_directories(andy8_routing PUBLIC include)
target_compile_options(andy8_routing PRIVATE -Wall -Wextra -Wpedantic)

if(BUILD_TESTING)
  add_executable(routing_tests tests/routing_tests.cpp)
  target_link_libraries(routing_tests PRIVATE andy8_routing)
  target_compile_options(routing_tests PRIVATE -Wall -Wextra -Wpedantic)
  add_test(NAME routing_tests COMMAND routing_tests)
endif()
