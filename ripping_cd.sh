#!/bin/bash

cdparanoia -B
ls -1 | xargs -L 1 lame --preset extreme
rm *.wav
