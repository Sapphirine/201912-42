cat citibike_files.txt | xargs -n 1 -P 6 wget -P ../data/citibike/
unzip '../data/citibike/*.zip' -d ../data/citibike/
