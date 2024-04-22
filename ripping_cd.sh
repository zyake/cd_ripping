#!/bin/bash

sudo cdparanoia -B
sudo chown zyake:zyake *.wav
ls -1|grep wav| xargs -L 1 lame --preset extreme
rm *.wav
