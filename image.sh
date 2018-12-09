#!/bin/bash

input=$1
link="http://drive.google.com/uc?export=view&id=${input##*=}"
echo $link | pbcopy
