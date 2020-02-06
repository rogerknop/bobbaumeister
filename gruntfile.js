module.exports = function (grunt) {
    // Project configuration.  
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            taskName: {
                options: { 
                    livereload: true
                },
                files: ['**/*.html', '**/*.js', '**/*.css'],
            }
        },        
        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: 8000,
                    base: './site',
                    useAvailablePort: true, 
                    livereload: true
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('serve', ['connect', 'watch']);
}