var companies = [
"Walmart",
"The Kroger Co.",
"Amazon",
"Costco",
"The Home Depot",
"Walgreens Boots Alliance",
"CVS Health Corporation",
"Target",
"Lowe's Companies",
"Albertsons Companies",
"Royal Ahold Delhaize USA",
"Apple Stores / iTunes",
"Best Buy",
"McDonald's",
"Publix Super Markets",
"TJX Companies",
"Aldi",
"Macy's",
"Dollar General",
"H-E-B Grocery",
"Dollar Tree",
"Rite Aid",
"Kohl's",
"Verizon Wireless",
"YUM! Brands",
"Meijer",
"Ace Hardware",
"Starbucks",
"Wakefern / ShopRite",
"Nordstrom",
"Sears Holdings",
"7-Eleven",
"Ross Stores",
"Subway",
"AT&T Wireless",
"Gap",
"BJ's Wholesale Club",
"J.C. Penney Co.",
"Bed Bath & Beyond",
"Qurate Retail Group",
"L Brands",
"Menard",
"Southeastern Grocers",
"Health Mart Systems",
"Good Neighbor Pharmacy",
"Hy-Vee",
"AutoZone",
"Alimentation Couche-Tard",
"Wendy's",
"Chick-fil-A",
"Dunkin' Brands Group",
"Giant Eagle",
"O'Reilly Auto Parts",
"Wegmans Food Market",
"Burger King Worldwide",
"Dick's Sporting Goods",
"Darden Restaurants",
"PetSmart",
"Sherwin-Williams",
"Staples",
"Army & Air Force Exchange",
"Bass Pro",
"Tractor Supply Co.",
"WinCo Foods",
"Save-A-Lot",
"Ascena Retail Group",
"Dine Brands Global",
"Office Depot",
"GameStop",
"Dillard's",
"Burlington Coat Factory",
"Toys R Us",
"Ulta Salon, Cosmetics & Fragrance",
"Sephora (LVMH)",
"Foot Locker",
"Ikea North American Svcs.",
"Domino's Pizza",
"Academy",
"Panera Bread Company",
"AVB Brandsource",
"Signet Jewelers",
"Big Lots",
"Williams-Sonoma",
"Saks Fifth Avenue / Lord & Taylor",
"Defense Commissary Agency",
"Hobby Lobby Stores",
"Speedway",
"Michaels Stores",
"True Value Co.",
"Discount Tire",
"Sprouts Farmers Market",
"Exxon Mobil Corporation",
"Neiman Marcus",
"Jack in the Box",
"Shell Oil Company",
"Sonic",
"Chipotle Mexican Grill",
"SUPERVALU",
"Belk",
"Petco Animal Supplies"]

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomPrice() {
    return (Math.random() * 100);
}

var types = ['Food', 'Utilities', 'Rent', 'Entertainment', 'Loan'];
function randomType() {
    var rand = Math.random() * (types.length - 1);
    return types[rand.toFixed(0)];
}

var data = [];
for (var i = 0; i < 10; i++) {
    companies.forEach((company) => {
        data.push({
            "name": company,
            "date": randomDate(new Date("January 1, 2021"), new Date("Decemeber 1, 2021")),
            "price": parseFloat(randomPrice().toFixed(2)),
            "type": randomType()
        })
    });
}

module.exports = {
    data: data
}
