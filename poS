---
title: "Raylib: GUI en C"
date: 2024-10-12T22:29:40-03:00
tags: ['raylib']
---
Instalar raylib:

https://github.com/raysan5/raylib/releases

Descargá el archivo correspondiente a tu sistema operativo que no sea DEV en mi caso https://github.com/raysan5/raylib/releases/download/4.2.0/raylib-4.2.0_linux_amd64.tar.gz

```bash
wget https://github.com/raysan5/raylib/releases/download/4.2.0/raylib-4.2.0_linux_amd64.tar.gz
tar xvf raylib-4.2.0_linux_amd64.tar.gz
cd raylib-4.2.0_linux_amd64.tar.gz
```

O compilá:

https://github.com/raysan5/raylib/wiki/Working-on-GNU-Linux

```bash
sudo apt install build-essential git
sudo apt install libasound2-dev libx11-dev libxrandr-dev libxi-dev libgl1-mesa-dev libglu1-mesa-dev libxcursor-dev libxinerama-dev libwayland-dev libxkbcommon-dev
```
#### Compilar las librerías usando make e instalarla en /usr/local/lib y /usr/local/include
```bash
git clone --depth 1 https://github.com/raysan5/raylib.git raylib
cd raylib/src/
make PLATFORM=PLATFORM_DESKTOP # To make the static version.
make PLATFORM=PLATFORM_DESKTOP RAYLIB_LIBTYPE=SHARED # To make the dynamic shared version.
make PLATFORM=PLATFORM_WEB # To make web version.
sudo make install # Static version.
sudo make install RAYLIB_LIBTYPE=SHARED # Dynamic shared version.

sudo make uninstall
sudo make uninstall RAYLIB_LIBTYPE=SHARED
```

#### Usando CMAKE
```bash
git clone https://github.com/raysan5/raylib.git raylib
cd raylib
mkdir build && cd build
cmake -DBUILD_SHARED_LIBS=ON ..
make
sudo make install
```

```c
#include "raylib.h"

#define RAYGUI_IMPLEMENTATION
#include "raygui.h"

int main()
{
    InitWindow(400, 200, "raygui - controls test suite");
    udo apt install build-essential gitSetTargetFPS(60);

    bool showMessageBox = false;

    while (!WindowShouldClose())
    {
        // Draw
        //----------------------------------------------------------------------------------
        BeginDrawing();
            ClearBackground(GetColor(GuiGetStyle(DEFAULT, BACKGROUND_COLOR)));

            if (GuiButton((Rectangle){ 24, 24, 120, 30 }, "#191#Show Message")) showMessageBox = true;

            if (showMessageBox)
            {
                int result = GuiMessageBox((Rectangle){ 85, 70, 250, 100 },
                    "#191#Message Box", "Hi! This is a message!", "Nice;Cool");

                if (result >= 0) showMessageBox = false;
            }

        EndDrawing();
    }

    CloseWindow();
    return 0;
}
```
