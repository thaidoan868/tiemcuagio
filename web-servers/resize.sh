#!/user/bin/env bash
dir="input"
#width="300:-1" edit ffmpeg scale argument

mkdir resize
resize_fn() {
	echo $1
	file_name=`basename $1`
	ffmpeg -i $1 -vf scale=250:-1 resize/$file_name
	#echo $file_name
}
export -f resize_fn
find $dir -name '*' -type f -exec bash -c 'resize_fn "$1"' _ {} \;
