#!/bin/sh

choose_option() {
    echo "auth"
    echo "funcA"
    echo "funcB"
    echo "funcC"
    echo "quit"
}

while true; do
    choice=$(choose_option | gum choose)
    case $choice in
    "auth")
        bun run src/api/spotifyAuth.ts
        if [ $? -eq 0 ]; then
            echo "Authentication successful. Proceeding to the next options..."
        else
            echo "Authentication failed. Exiting..."
            exit 1
        fi
        ;;
    "funcA")
        bun run src/api/funcA
        ;;
    "funcB")
        bun run src/api/funcB
        ;;
    "funcC")
        bun run src/api/funcC
        ;;
    "quit")
        echo "Exiting"
        exit 0
        ;;
    *)
        echo "Invalid choice."
        ;;
    esac
done
