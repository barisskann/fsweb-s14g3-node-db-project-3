-- Multi-Table Sorgu Pratiği

-- Tüm ürünler(product) için veritabanındaki ProductName ve CategoryName'i listeleyin. (77 kayıt göstermeli)
select p.ProductName,c.CategoryName from Product p
left join Category c 
on p.CategoryId=c.Id

-- 9 Ağustos 2012 öncesi verilmiş tüm siparişleri(order) için sipariş id'si (Id) ve gönderici şirket adını(CompanyName)'i listeleyin. (429 kayıt göstermeli)
select * from [Order]  o
left join Shipper s 
on s.Id=o.ShipVia
WHERE o.OrderDate<"2012-08-09"



-- Id'si 10251 olan siparişte verilen tüm ürünlerin(product) sayısını ve adını listeleyin. ProdcutName'e göre sıralayın. (3 kayıt göstermeli)
select p.ProductName,od.Quantity from OrderDetail od
left join Product p 
ON p.Id=od.ProductId
where od.OrderId=10251
ORDER BY p.productName

-- Her sipariş için OrderId, Müşteri'nin adını(Company Name) ve çalışanın soyadını(employee's LastName). Her sütun başlığı doğru bir şekilde isimlendirilmeli. (16.789 kayıt göstermeli)

select o.Id,c.CompanyName,e.LastName from [Order] o
 join Employee e 
on o.EmployeeID=e.Id
join Customer c 
on o.CustomerID=C.Id
ORDER BY o.Id