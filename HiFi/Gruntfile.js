module.exports = function (grunt) {
    grunt.initConfig({
        typedoc: {
            build: {
                options: {
                    module: 'commonjs',
                    out: './docs',
                    name: 'hifi',
                    target: 'es5',
                    includeDeclarations: ''
                },
                src: [
                    './hifi/**/*'
                ]
            }
        },

        copy: {
            lib: {
                files: [
                    {
                        src: './lib/lib.d.ts',
                        dest: './node_modules/grunt-typedoc/node_modules/typedoc/node_modules/typescript/bin/lib.d.ts'
                    }
                ]
            }
        },

        clean: [
            'docs'
        ]
    });

    grunt.loadNpmTasks('grunt-typedoc');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['clean', 'copy', 'typedoc']);
}