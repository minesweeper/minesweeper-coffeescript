
begin
  require 'jasmine'
  load 'jasmine/tasks/jasmine.rake'
rescue LoadError
  task :jasmine do
    abort "Jasmine is not available. In order to run jasmine, you must: (sudo) gem install jasmine"
  end
end

task :jasmine => :coffee

task :coffee do
  sh 'coffee -o javascripts -c coffeescripts/*.coffee'
end
