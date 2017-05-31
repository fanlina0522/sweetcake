//创建一个gulp任务
//引入gulp模块
var gulp = require('gulp');

//引入gulp-sass插件
var sass = require('gulp-sass');

//创建一个gulp任务，编译scss文件
gulp.task('compileSass',function(){

 	//查找sass文件所在的位置
	gulp.src('src/sass/*.scss')

	//通过pipe方法导入到gulp的插件中实现编译
	.pipe(sass({outputStyle:'expanded'}).on('error',sass.logError))
	
	//编译后把文件输出，会在haigou/css中自动生成同名的css文件
	.pipe(gulp.dest('src/css'));
})

//监听
gulp.task('jtSass',function(){
	gulp.watch('src/sass/*.scss',['compileSass']);
})
