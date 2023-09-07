set :output, 'log/crontab.log'
# ENV['RAILS_ENV'] ||= 'development'
# set :environment, ENV['RAILS_ENV']
set :environment, 'development'

every 1.minutes do
  rake "country_lisk:get_lisk_level"
end
