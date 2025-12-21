#!/bin/bash

tsc && vite build
scp -r -P 64223 dist/* kane16@176.107.131.226:/home/kane16/client/portfolio
read -s -p "Enter your sudo password: " sudo_password
echo "\n"
ssh -p 64223 kane16@176.107.131.226 \
 "echo \"$sudo_password\" | sudo -S rm -rf /var/www/portfolio && echo \"$sudo_password\" | sudo -S mv /home/kane16/client/portfolio /var/www"
echo "\n"
echo "Publication complete"