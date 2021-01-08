#!/bin/bash

DIR=/etc/init.d/
max=`ls $DIR | wc -l`

for (( i=1; $max >= i; i++))
do

if test $i -eq `ls $DIR | grep -n halt | cut -f 1 -d ":" | head -n 1`\
 -o $i -eq `ls $DIR | grep -n reboot | cut -f 1 -d ":" | head -n 1`
then
:
else

 echo "------------------------------"
 echo
 echo "`ls $DIR  | head -n $i | tail -n 1`"
 echo
 cd $DIR
 ./`ls $DIR | head -n $i | tail -n 1` status
 echo
fi

done