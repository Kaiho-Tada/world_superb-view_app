require 'roo'

xlsx = Roo::Excelx.new("./country.xlsx")
p xlsx.cell(5, 3)
p xlsx.cell(5, 4)
p xlsx.cell(5, 5)
