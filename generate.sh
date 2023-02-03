#!/bin/bash

length=10
characters='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
version=$(cat /dev/urandom | tr -dc "$characters" | fold -w "$length" | head -n 1)
echo "$version"
export version='$verison'
source ~/.bashrc