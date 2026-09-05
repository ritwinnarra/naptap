// Nightfall Globe: guess where a city is on the Earth at night.
// Imagery lists come from tiles/manifest.js (or are inlined by tools/build_single.py).
const NIGHT_TEXTURE = TILES.base;
const HI_TILES = TILES.hi;
const Z7 = TILES.z7;
const Z8 = TILES.z8 || [];

// ---------- Cities ----------
// [name, country, lat, lon, note]
const CITIES = [
["Tokyo","Japan",35.68,139.69,"The Greater Tokyo area is the most populous metropolitan region on Earth, home to roughly 37 million people."],
["Delhi","India",28.61,77.21,"Delhi has been continuously inhabited since the 6th century BCE and served as the capital of several empires."],
["Shanghai","China",31.23,121.47,"Shanghai's Pudong skyline was farmland until 1990; it now holds three of the world's tallest buildings."],
["São Paulo","Brazil",-23.55,-46.63,"The largest city in the Southern Hemisphere, named after Saint Paul on the day of its founding in 1554."],
["Mexico City","Mexico",19.43,-99.13,"Built on the drained bed of Lake Texcoco, on the ruins of the Aztec capital Tenochtitlan."],
["Cairo","Egypt",30.04,31.24,"Founded in 969 CE by the Fatimids; the pyramids of Giza sit at its western edge."],
["Mumbai","India",19.08,72.88,"Originally seven islands, joined by land reclamation into a single peninsula during the 1800s."],
["Beijing","China",39.90,116.41,"Beijing has been China's capital for most of the last 800 years, since Kublai Khan chose it in 1272."],
["Dhaka","Bangladesh",23.81,90.41,"One of the densest cities on Earth, sitting on the Ganges–Brahmaputra delta."],
["Osaka","Japan",34.69,135.50,"Japan's historic merchant capital, famed for its street food and the 16th-century Osaka Castle."],
["New York","United States",40.71,-74.01,"New Amsterdam until 1664, when the English renamed it after the Duke of York."],
["Karachi","Pakistan",24.86,67.01,"Pakistan's first capital and largest city, a port on the Arabian Sea."],
["Buenos Aires","Argentina",-34.60,-58.38,"Its name means 'fair winds'; the city sits on the Río de la Plata, the world's widest river."],
["Istanbul","Turkey",41.01,28.98,"The only major city that spans two continents, straddling the Bosphorus between Europe and Asia."],
["Kolkata","India",22.57,88.36,"Capital of British India until 1911, on the Hooghly River in the Ganges delta."],
["Lagos","Nigeria",6.52,3.38,"Africa's largest city by population, grown from a fishing settlement on a lagoon island."],
["Manila","Philippines",14.60,120.98,"Founded by the Spanish in 1571 on the shores of Manila Bay, one of the world's finest natural harbours."],
["Rio de Janeiro","Brazil",-22.91,-43.17,"Portuguese explorers mistook Guanabara Bay for a river mouth in January 1502, hence the name."],
["Kinshasa","DR Congo",-4.32,15.31,"Faces Brazzaville across the Congo River — the two closest capital cities in the world."],
["Lahore","Pakistan",31.55,74.34,"Capital of the Mughal Empire under Akbar; its Badshahi Mosque was the world's largest for 300 years."],
["Los Angeles","United States",34.05,-118.24,"Founded in 1781 as a Spanish pueblo, with the full name El Pueblo de Nuestra Señora la Reina de los Ángeles."],
["Bangkok","Thailand",13.76,100.50,"Its full ceremonial Thai name is 168 letters long, the longest place name in the world."],
["Moscow","Russia",55.76,37.62,"First mentioned in 1147; the Kremlin's walls date from the 1480s."],
["Tehran","Iran",35.69,51.39,"Sits at the foot of the Alborz mountains; Mount Damavand, Asia's highest volcano, is visible on clear days."],
["Jakarta","Indonesia",-6.21,106.85,"Parts of the city are sinking up to 25 cm a year; Indonesia is building a new capital on Borneo."],
["London","United Kingdom",51.51,-0.13,"Founded by the Romans as Londinium around 47 CE, on the north bank of the Thames."],
["Lima","Peru",-12.05,-77.04,"One of the driest capital cities in the world, receiving under 10 mm of rain a year."],
["Bogotá","Colombia",4.71,-74.07,"At 2,640 m, one of the highest capitals on Earth, on a plateau in the Andes."],
["Paris","France",48.86,2.35,"Named after the Parisii, a Gallic tribe who settled the Île de la Cité around 250 BCE."],
["Chennai","India",13.08,80.27,"Formerly Madras, home to Marina Beach, one of the longest urban beaches in the world."],
["Hyderabad","India",17.39,78.49,"Founded in 1591 around the Charminar; once the world's diamond-trading capital."],
["Bangalore","India",12.97,77.59,"Sits nearly a kilometre above sea level, giving it a famously mild climate for India."],
["Ho Chi Minh City","Vietnam",10.82,106.63,"Still widely called Saigon; it was the capital of South Vietnam until 1975."],
["Nagoya","Japan",35.18,136.91,"Japan's fourth-largest city and the home base of Toyota, between Tokyo and Osaka."],
["Chicago","United States",41.88,-87.63,"Reversed the flow of the Chicago River in 1900 to keep sewage out of Lake Michigan."],
["Luanda","Angola",-8.84,13.23,"Founded by the Portuguese in 1576, once a major hub of the Atlantic slave trade."],
["Kuala Lumpur","Malaysia",3.14,101.69,"Its name means 'muddy confluence'; the Petronas Towers were the world's tallest from 1998 to 2004."],
["Riyadh","Saudi Arabia",24.71,46.68,"Once a walled oasis town on the Najd plateau; now a metropolis of more than 7 million."],
["Baghdad","Iraq",33.32,44.37,"Founded in 762 CE as a round city; it was the largest city in the world by the 9th century."],
["Santiago","Chile",-33.45,-70.67,"Ringed by the Andes; the peaks are visible from the city centre on clear days."],
["Madrid","Spain",40.42,-3.70,"The highest capital in the EU at 650 m, roughly at the geographic centre of Spain."],
["Toronto","Canada",43.65,-79.38,"Over half of its residents were born outside Canada, making it one of the most diverse cities anywhere."],
["Singapore","Singapore",1.35,103.82,"A city-state 137 km north of the equator, founded as a British trading post in 1819."],
["Nairobi","Kenya",-1.29,36.82,"The only capital city with a national park inside its boundaries, where lions roam near the skyline."],
["Addis Ababa","Ethiopia",9.03,38.74,"Sits at 2,355 m, headquarters of the African Union; the name means 'new flower' in Amharic."],
["Sydney","Australia",-33.87,151.21,"Founded in 1788 as a British penal colony on one of the world's largest natural harbours."],
["Melbourne","Australia",-37.81,144.96,"Australia's capital from 1901 to 1927, while Canberra was being built."],
["Cape Town","South Africa",-33.93,18.42,"Founded in 1652 as a supply station for Dutch ships rounding the Cape of Good Hope."],
["Johannesburg","South Africa",-26.20,28.05,"Founded in 1886 after gold was discovered on the Witwatersrand ridge."],
["Casablanca","Morocco",33.57,-7.59,"Morocco's largest city and port; its Hassan II Mosque has the tallest minaret in Africa."],
["Berlin","Germany",52.52,13.41,"Has more bridges than Venice — around 960 — spanning its rivers and canals."],
["Rome","Italy",41.90,12.50,"Traditionally founded in 753 BCE; the Vatican, the world's smallest state, lies within it."],
["Athens","Greece",37.98,23.73,"One of the oldest cities in the world, inhabited for at least 3,400 years."],
["Stockholm","Sweden",59.33,18.07,"Built across 14 islands where Lake Mälaren meets the Baltic Sea."],
["Oslo","Norway",59.91,10.75,"Sits at the head of the 100 km long Oslofjord; the Nobel Peace Prize is awarded here each December."],
["Helsinki","Finland",60.17,24.94,"Founded by the Swedish king in 1550 to compete with Tallinn across the Gulf of Finland."],
["Reykjavík","Iceland",64.15,-21.94,"The world's northernmost national capital, heated almost entirely by geothermal energy."],
["Dublin","Ireland",53.35,-6.26,"Founded by Vikings in the 9th century; its Irish name means 'black pool'."],
["Lisbon","Portugal",38.72,-9.14,"Rebuilt after a 1755 earthquake and tsunami that destroyed most of the city."],
["Warsaw","Poland",52.23,21.01,"Around 85% of the city was destroyed in WWII; the Old Town was rebuilt brick by brick from paintings."],
["Prague","Czechia",50.08,14.44,"Its Astronomical Clock, installed in 1410, is the oldest still in operation."],
["Vienna","Austria",48.21,16.37,"Capital of the Habsburg empire for six centuries; regularly ranked the world's most liveable city."],
["Budapest","Hungary",47.50,19.04,"Formed in 1873 by merging Buda and Óbuda on the west bank with Pest on the east."],
["Kyiv","Ukraine",50.45,30.52,"Founded in the 5th century; the 'mother of Rus' cities' on the Dnieper river."],
["Amsterdam","Netherlands",52.37,4.90,"Built on around 11 million wooden poles driven into marshy ground; has 165 canals."],
["Zurich","Switzerland",47.38,8.54,"Switzerland's largest city, on the northern tip of Lake Zurich."],
["Dubai","United Arab Emirates",25.20,55.27,"A pearl-diving village a century ago; now home to the 828 m Burj Khalifa."],
["Tel Aviv","Israel",32.09,34.78,"Founded in 1909 on sand dunes north of Jaffa; known for 4,000 Bauhaus-style buildings."],
["Doha","Qatar",25.29,51.53,"Hosted the 2022 FIFA World Cup; most of its skyline was built after 2000."],
["Kabul","Afghanistan",34.56,69.21,"One of the highest capitals in the world at 1,790 m, in a valley of the Hindu Kush."],
["Tashkent","Uzbekistan",41.30,69.24,"The largest city in Central Asia, an ancient Silk Road oasis rebuilt after a 1966 earthquake."],
["Almaty","Kazakhstan",43.24,76.89,"Kazakhstan's former capital, at the foot of the Tian Shan; its name means 'full of apples'."],
["Ulaanbaatar","Mongolia",47.92,106.92,"The coldest national capital on Earth, with average January temperatures around −25 °C."],
["Seoul","South Korea",37.57,126.98,"Capital of Korea since 1394; the Han River runs through the middle of the city."],
["Taipei","Taiwan",25.03,121.57,"Taipei 101 was the world's tallest building from 2004 to 2010 and uses a 660-tonne damper against typhoons."],
["Hong Kong","China",22.32,114.17,"Has more skyscrapers than any other city, packed onto steep hills around Victoria Harbour."],
["Hanoi","Vietnam",21.03,105.85,"Founded in 1010 as Thăng Long, 'ascending dragon'; the city celebrated its millennium in 2010."],
["Yangon","Myanmar",16.87,96.20,"Former capital of Myanmar; its Shwedagon Pagoda is covered in gold and topped with diamonds."],
["Colombo","Sri Lanka",6.93,79.85,"A port known to Roman, Arab and Chinese traders 2,000 years ago."],
["Kathmandu","Nepal",27.72,85.32,"Sits in a bowl-shaped valley at 1,400 m, once a lake, with seven UNESCO heritage sites."],
["Perth","Australia",-31.95,115.86,"One of the most isolated major cities on Earth — Adelaide, 2,100 km away, is the nearest big city."],
["Auckland","New Zealand",-36.85,174.76,"Built on a field of around 50 volcanoes; one in three New Zealanders lives here."],
["Honolulu","United States",21.31,-157.86,"The most remote major city in the world, 3,800 km from the nearest continent."],
["Anchorage","United States",61.22,-149.90,"Roughly equidistant by air from New York, Tokyo and Frankfurt — a major cargo hub."],
["Vancouver","Canada",49.28,-123.12,"A city of mountains and sea; Stanley Park is larger than New York's Central Park."],
["San Francisco","United States",37.77,-122.42,"Grew from 1,000 people to 25,000 in a year during the 1849 Gold Rush."],
["Seattle","United States",47.61,-122.33,"Founded in 1851 and rebuilt on top of itself after the Great Fire of 1889."],
["Denver","United States",39.74,-104.99,"The 'Mile High City' — the 13th step of the State Capitol sits exactly 1,609 m above sea level."],
["Houston","United States",29.76,-95.37,"Home to NASA's Mission Control; the first word spoken from the Moon was 'Houston'."],
["Miami","United States",25.76,-80.19,"The only major US city founded by a woman, Julia Tuttle, in 1896."],
["Havana","Cuba",23.11,-82.37,"Founded by the Spanish in 1519; its Old Town is a UNESCO World Heritage site."],
["Panama City","Panama",8.98,-79.52,"The only capital city with a rainforest inside its limits, at the Pacific end of the Panama Canal."],
["Caracas","Venezuela",10.48,-66.90,"In a narrow valley separated from the Caribbean by the Ávila mountain."],
["Quito","Ecuador",-0.18,-78.47,"The closest capital to the equator, at 2,850 m in the Andes."],
["La Paz","Bolivia",-16.50,-68.15,"The world's highest seat of government at around 3,640 m, served by a cable-car public transit network."],
["Montevideo","Uruguay",-34.90,-56.16,"The southernmost capital in the Americas, on the north shore of the Río de la Plata."],
["Brasília","Brazil",-15.79,-47.88,"Purpose-built as the capital in just 41 months and inaugurated in 1960; from above its plan resembles an airplane."],
["Accra","Ghana",5.60,-0.19,"Sits almost exactly on the Greenwich Meridian, on the Gulf of Guinea."],
["Dakar","Senegal",14.72,-17.47,"The westernmost city on the African mainland, on the Cap-Vert peninsula."],
["Algiers","Algeria",36.75,3.06,"Its white buildings climbing the hills earned it the nickname 'Alger la Blanche'."],
["Tunis","Tunisia",36.81,10.18,"The ruins of ancient Carthage lie in its northern suburbs."],
["Khartoum","Sudan",15.50,32.56,"Where the Blue Nile and White Nile meet to form the Nile proper."],
["Dar es Salaam","Tanzania",-6.79,39.28,"Its name means 'abode of peace' in Arabic; Tanzania's largest city and main port."],
["Kampala","Uganda",0.35,32.58,"Built on seven hills near the northern shore of Lake Victoria."],
["Antananarivo","Madagascar",-18.88,47.51,"Madagascar's capital, spread across twelve sacred hills in the central highlands."],
["Maputo","Mozambique",-25.97,32.57,"A port on the Indian Ocean; the railway station was reputedly designed in Eiffel's studio."],
["Manchester","United Kingdom",53.48,-2.24,"The world's first industrial city, and home to the first passenger railway station (1830)."],
["Edinburgh","United Kingdom",55.95,-3.19,"Built around an extinct volcano; its castle sits on the volcanic plug."],
["Barcelona","Spain",41.39,2.17,"Gaudí's Sagrada Família has been under construction since 1882."],
["Milan","Italy",45.46,9.19,"Its Gothic cathedral took nearly six centuries to complete."],
["Munich","Germany",48.14,11.58,"Oktoberfest began in 1810 as a royal wedding celebration."],
["Copenhagen","Denmark",55.68,12.57,"More than 60% of residents commute by bicycle every day."],
["Saint Petersburg","Russia",59.93,30.34,"Built on marshland by Peter the Great in 1703 as Russia's 'window to Europe'."],
["Vladivostok","Russia",43.12,131.89,"The eastern terminus of the Trans-Siberian Railway, 9,289 km from Moscow."],
["Novosibirsk","Russia",55.03,82.92,"Siberia's largest city, grown around a Trans-Siberian bridge over the Ob River."],
["Bucharest","Romania",44.43,26.10,"Its Palace of the Parliament is the heaviest building in the world."],
["Belgrade","Serbia",44.79,20.46,"At the confluence of the Sava and Danube, fought over in some 115 wars and razed 44 times."],
["Chengdu","China",30.57,104.07,"Home of the giant panda research base; a 2,300-year-old irrigation system still waters its plain."],
["Wuhan","China",30.59,114.31,"Where the Han River joins the Yangtze; three cities merged into one in 1927."],
["Xi'an","China",34.34,108.94,"Eastern end of the Silk Road and home of the Terracotta Army."],
["Guangzhou","China",23.13,113.26,"Known as Canton to Western traders, it was China's only port open to foreigners for a century."],
["Lhasa","China",29.65,91.10,"At 3,650 m, one of the highest cities in the world; the Potala Palace rises above it."],
["Sapporo","Japan",43.06,141.35,"Hosted the 1972 Winter Olympics; its annual Snow Festival draws two million visitors."],
["Fukuoka","Japan",33.59,130.40,"Japan's closest major city to mainland Asia; Seoul is nearer than Tokyo."],
["Busan","South Korea",35.18,129.08,"South Korea's second city and one of the busiest container ports in the world."],
["Cebu","Philippines",10.32,123.89,"The oldest Spanish settlement in the Philippines, founded in 1565."],
["Denpasar","Indonesia",-8.65,115.22,"Capital of Bali, the only Hindu-majority province in Indonesia."],
["Surabaya","Indonesia",-7.26,112.75,"Indonesia's second city; its name is said to come from a legendary fight between a shark and a crocodile."],
["Port Moresby","Papua New Guinea",-9.44,147.18,"Capital of the most linguistically diverse country on Earth, with over 800 languages."],
["Darwin","Australia",-12.46,130.84,"Australia's tropical northern capital, closer to Jakarta than to Sydney."],
["Brisbane","Australia",-27.47,153.03,"Winds along the Brisbane River; hosts the 2032 Summer Olympics."],
["Adelaide","Australia",-34.93,138.60,"Planned on a grid in 1836 with a ring of parkland that still encircles the centre."],
["Wellington","New Zealand",-41.29,174.78,"The world's southernmost national capital and one of the windiest cities."],
["Nuuk","Greenland",64.18,-51.72,"The world's northernmost capital city, home to a third of Greenland's population."],
["Fairbanks","United States",64.84,-147.72,"One of the best places on Earth to see the northern lights, 320 km south of the Arctic Circle."],
["Guadalajara","Mexico",20.66,-103.35,"Birthplace of mariachi music and tequila, made from agave grown nearby."],
["Monterrey","Mexico",25.69,-100.32,"Mexico's industrial heartland, overlooked by the saddle-shaped Cerro de la Silla."],
["Guatemala City","Guatemala",14.63,-90.51,"The largest city in Central America, built in a valley among volcanoes."],
["San Juan","Puerto Rico",18.47,-66.11,"The second-oldest European-founded capital in the Americas, established 1521."],
["Kingston","Jamaica",17.97,-76.79,"Its harbour is the seventh-largest natural harbour in the world."],
["Santo Domingo","Dominican Republic",18.49,-69.93,"Founded in 1496, the oldest continuously inhabited European city in the Americas."],
["Medellín","Colombia",6.24,-75.58,"The 'City of Eternal Spring', in a narrow valley crossed by cable cars used as public transit."],
["Salvador","Brazil",-12.97,-38.51,"Brazil's first capital, the heart of Afro-Brazilian culture, on the Bay of All Saints."],
["Manaus","Brazil",-3.12,-60.02,"A river city 1,500 km up the Amazon, with an opera house built by rubber barons in 1896."],
["Recife","Brazil",-8.05,-34.88,"The easternmost major city of the Americas, threaded with rivers and bridges."],
["Asunción","Paraguay",-25.28,-57.63,"One of the oldest cities in South America, the 'Mother of Cities' from which others were founded."],
["Ushuaia","Argentina",-54.80,-68.30,"The southernmost city in the world, on the Beagle Channel in Tierra del Fuego."],
["Punta Arenas","Chile",-53.16,-70.91,"On the Strait of Magellan; a boom town before the Panama Canal opened."],
["Windhoek","Namibia",-22.56,17.08,"Capital of one of the world's least densely populated countries, set among hills at 1,650 m."],
["Lusaka","Zambia",-15.39,28.32,"One of the fastest-growing cities in southern Africa, on a plateau at 1,280 m."],
["Harare","Zimbabwe",-17.83,31.05,"Known as Salisbury until 1982; sits on a highveld plateau with jacaranda-lined streets."],
["Kigali","Rwanda",-1.94,30.06,"Spread over rolling hills in the centre of Rwanda, often called the cleanest city in Africa."],
["Mogadishu","Somalia",2.05,45.32,"A medieval trading port on the Indian Ocean that once minted its own coins."],
["Djibouti","Djibouti",11.59,43.15,"Guards the Bab-el-Mandeb strait where the Red Sea meets the Gulf of Aden."],
["Muscat","Oman",23.59,58.38,"Wedged between mountains and sea; buildings are limited in height to keep the skyline low."],
["Sanaa","Yemen",15.37,44.19,"One of the oldest continuously inhabited cities, with 'gingerbread' tower houses over 1,000 years old."],
["Jeddah","Saudi Arabia",21.49,39.19,"The gateway to Mecca on the Red Sea, with a fountain that shoots 312 m into the air."],
["Amman","Jordan",31.95,35.93,"Built on seven hills (now nineteen); a Roman theatre still stands in the centre."],
["Beirut","Lebanon",33.89,35.50,"Rebuilt after being destroyed at least seven times in its 5,000-year history."],
["Tbilisi","Georgia",41.69,44.83,"Named after its hot springs — 'tbili' means warm in Georgian."],
["Yerevan","Armenia",40.18,44.51,"Founded in 782 BCE, 29 years before Rome, with Mount Ararat on the skyline."],
["Baku","Azerbaijan",40.41,49.87,"The lowest-lying national capital, 28 m below sea level on the Caspian Sea."],
["Ankara","Turkey",39.93,32.86,"Chosen as Turkey's capital in 1923 for its position in the Anatolian interior."],
["Isfahan","Iran",32.65,51.67,"Once so grand that a Persian saying called it 'half the world'."],
["Islamabad","Pakistan",33.69,73.04,"A planned capital built in the 1960s at the foot of the Margalla Hills."],
["Ahmedabad","India",23.02,72.57,"India's first UNESCO World Heritage City, where Gandhi's Sabarmati Ashram stands."],
["Jaipur","India",26.91,75.79,"The 'Pink City', painted in 1876 to welcome the Prince of Wales."],
["Kochi","India",9.93,76.27,"A spice port on the Malabar Coast visited by Chinese, Arab and Portuguese traders."],
["Chittagong","Bangladesh",22.36,91.78,"Bangladesh's main seaport, on the Bay of Bengal near the Karnaphuli River."],
["Phnom Penh","Cambodia",11.56,104.92,"At the meeting of the Mekong and Tonlé Sap rivers; the Tonlé Sap reverses direction every year."],
["Vientiane","Laos",17.97,102.63,"A capital on the Mekong that looks across the river directly at Thailand."],
["Kuching","Malaysia",1.55,110.35,"The 'Cat City' on the island of Borneo, capital of Sarawak."],
["Ürümqi","China",43.83,87.62,"The most remote city from any sea in the world — about 2,500 km from the nearest coast."],
["Harbin","China",45.80,126.53,"Famous for an ice-sculpture festival in winters that dip below −30 °C."],
["Irkutsk","Russia",52.29,104.30,"The gateway to Lake Baikal, the deepest and oldest lake on Earth."],
["Yakutsk","Russia",62.03,129.73,"The coldest large city in the world, built on permafrost."],
["Murmansk","Russia",68.97,33.08,"The largest city north of the Arctic Circle, with an ice-free port."],
["Tromsø","Norway",69.65,18.96,"350 km north of the Arctic Circle; the sun doesn't rise for two months each winter."],
["Tallinn","Estonia",59.44,24.75,"One of Europe's best-preserved medieval old towns; the government pioneered online voting."],
["Riga","Latvia",56.95,24.11,"Holds the largest collection of Art Nouveau buildings in the world."],
["Vilnius","Lithuania",54.69,25.28,"The Old Town is one of the largest surviving medieval quarters in Europe."],
["Minsk","Belarus",53.90,27.57,"Almost entirely rebuilt after WWII in grand Stalinist style."],
["Sarajevo","Bosnia and Herzegovina",43.86,18.41,"Where Archduke Franz Ferdinand was assassinated in 1914, sparking WWI."],
["Valletta","Malta",35.90,14.51,"Built by the Knights of St John after 1565; the EU's smallest capital."],
["Marseille","France",43.30,5.37,"France's oldest city, founded by Greek sailors around 600 BCE."],
["Naples","Italy",40.85,14.27,"Birthplace of pizza, in the shadow of Vesuvius."],
["Porto","Portugal",41.15,-8.61,"Gave Portugal its name and lends its own to port wine, aged in cellars across the Douro."],
["Seville","Spain",37.39,-5.99,"Magellan's expedition to circle the globe set sail from here in 1519."],
["Glasgow","United Kingdom",55.86,-4.25,"Once the 'second city of the Empire', building a fifth of the world's ships."],
["Montréal","Canada",45.50,-73.57,"The second-largest French-speaking city in the world, built around an island in the St Lawrence."],
["Calgary","Canada",51.05,-114.07,"Hosted the 1988 Winter Olympics; an hour's drive from the Rocky Mountains."],
["Winnipeg","Canada",49.90,-97.14,"At the geographic centre of North America — and the inspiration for Winnie-the-Pooh's name."],
["Halifax","Canada",44.65,-63.58,"Site of the 1917 Halifax Explosion, the largest man-made blast before the atomic bomb."],
["New Orleans","United States",29.95,-90.07,"Much of the city sits below sea level, between the Mississippi and Lake Pontchartrain."],
["Atlanta","United States",33.75,-84.39,"Home to the world's busiest airport for most of the last two decades."],
["Boston","United States",42.36,-71.06,"Site of the 1773 Tea Party; the first public park and public school in the US."],
["Washington","United States",38.91,-77.04,"A planned capital on the Potomac, designed by Pierre L'Enfant in 1791."],
["Minneapolis","United States",44.98,-93.27,"Its name blends the Dakota word for water with the Greek word for city."],
["Phoenix","United States",33.45,-112.07,"The hottest big city in the US, with over 100 days a year above 38 °C."],
["Las Vegas","United States",36.17,-115.14,"Its Strip is said to be the brightest spot on Earth seen from space."],
["Salt Lake City","United States",40.76,-111.89,"Founded in 1847 by Mormon pioneers beside the Great Salt Lake."],
["Dallas","United States",32.78,-96.80,"Grew as a railroad crossing; the DFW metroplex is the largest inland metro area in the US."],
];

// ---------- Utils ----------
const R = 1;
const DEG = Math.PI/180;
function latLonToVec3(lat, lon, r=R){
  const phi = (lon+180)*DEG, theta = (90-lat)*DEG;
  return new THREE.Vector3(-r*Math.cos(phi)*Math.sin(theta), r*Math.cos(theta), r*Math.sin(phi)*Math.sin(theta));
}
function vec3ToLatLon(v){
  const n = v.clone().normalize();
  const theta = Math.acos(Math.max(-1,Math.min(1,n.y)));
  const phi = Math.atan2(n.z, -n.x);
  let lon = phi/DEG - 180; if(lon < -180) lon += 360;
  return {lat: 90 - theta/DEG, lon};
}
function haversine(a, b){
  const dLat=(b.lat-a.lat)*DEG, dLon=(b.lon-a.lon)*DEG;
  const s=Math.sin(dLat/2)**2+Math.cos(a.lat*DEG)*Math.cos(b.lat*DEG)*Math.sin(dLon/2)**2;
  return 6371*2*Math.atan2(Math.sqrt(s),Math.sqrt(1-s));
}
function pointsFor(km){ return Math.round(1000*Math.exp(-km/1500)); }
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function seedFromDate(d){ return d.getFullYear()*10000 + (d.getMonth()+1)*100 + d.getDate(); }
function pickFive(seed){
  const rnd = mulberry32(seed*2654435761 % 2**31);
  const idx = new Set();
  while(idx.size<5) idx.add(Math.floor(rnd()*CITIES.length));
  return [...idx].map(i=>CITIES[i]);
}
const fmtKm = km => km<10 ? km.toFixed(1) : Math.round(km).toLocaleString();
const dateKey = d => d.toISOString().slice(0,10);
const store = {
  get(k){ try{ return JSON.parse(localStorage.getItem(k)); }catch(e){ return null; } },
  set(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
};

// ---------- Scene ----------
// Model: the camera is fixed on the +Z axis looking at the origin; all rotation happens on the `earth` group.
const canvas = document.getElementById('stage');
const renderer = new THREE.WebGLRenderer({canvas, antialias:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40, 1, 0.01, 100);
let camDist = 3.1;
const MIN_D=1.07; let MAX_D=4.5, FIT_D=3.1;

const stars = (()=>{
  const n=2500, pos=new Float32Array(n*3);
  for(let i=0;i<n;i++){ const u=Math.random()*2-1, a=Math.random()*Math.PI*2, s=Math.sqrt(1-u*u); const v=new THREE.Vector3(s*Math.cos(a),u,s*Math.sin(a)).multiplyScalar(40); pos.set([v.x,v.y,v.z],i*3); }
  const g=new THREE.BufferGeometry(); g.setAttribute('position',new THREE.BufferAttribute(pos,3));
  return new THREE.Points(g,new THREE.PointsMaterial({color:0x8A8FA8,size:0.09,sizeAttenuation:true,transparent:true,opacity:.8}));
})();
scene.add(stars);

const earth = new THREE.Group(); scene.add(earth);
const tex = new THREE.TextureLoader().load(NIGHT_TEXTURE, ()=>{ document.getElementById('modeline').textContent = modeLabel(); });
tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
const globe = new THREE.Mesh(new THREE.SphereGeometry(R, 96, 64), new THREE.MeshBasicMaterial({map:tex}));
earth.add(globe);

// Detail layers. Everything ships inside the page, but GPU memory on phones is finite, so each layer keeps only the
// tiles near the current view resident and disposes the rest as you move: 32 tiles of 2048px (16k equirect, ≈2.4 km/px),
// then 512px patches at ≈1.2 km/px over every lit region, then 2.25° tiles at ≈490 m/px (NASA GIBS
// VIIRS_CityLights_2012, its finest level) over the same regions, used only when zoomed right in.
const texLoader = new THREE.TextureLoader();
function makeLayer(group, items, radius, segs, opts){
  const L={group, radius, segs, ...opts, items: items.map(it=>{
    const c=latLonToVec3((it.lat0+it.lat1)/2,(it.lon0+it.lon1)/2).normalize();
    const corner=latLonToVec3(it.lat0,it.lon0).normalize();
    return {...it, c, half: Math.max(c.angleTo(corner), c.angleTo(latLonToVec3(it.lat1,it.lon0).normalize())), mesh:null, loading:false};
  }), busy:0};
  return L;
}
function loadItem(L, it){
  it.loading=true; L.busy++;
  texLoader.load(it.src, tx=>{
    tx.anisotropy=renderer.capabilities.getMaxAnisotropy(); tx.minFilter=THREE.LinearMipmapLinearFilter;
    const geo=new THREE.SphereGeometry(L.radius, L.segs, L.segs, (it.lon0+180)*DEG, (it.lon1-it.lon0)*DEG, (90-it.lat1)*DEG, (it.lat1-it.lat0)*DEG);
    it.mesh=new THREE.Mesh(geo, new THREE.MeshBasicMaterial({map:tx})); L.group.add(it.mesh);
    it.loading=false; L.busy--;
  }, undefined, ()=>{ it.loading=false; L.busy--; });
}
function unloadItem(L, it){
  L.group.remove(it.mesh); it.mesh.geometry.dispose(); it.mesh.material.map.dispose(); it.mesh.material.dispose(); it.mesh=null;
}
function viewCentreDir(){ return new THREE.Vector3(0,0,1).applyQuaternion(earth.quaternion.clone().invert()); }
function updateLayer(L){
  if(camDist>L.maxDist) { // layer not needed at this zoom: drop everything
    L.items.forEach(it=>{ if(it.mesh) unloadItem(L,it); }); return;
  }
  // angular radius of the area worth loading: the horizon, or when zoomed in, the screen's diagonal (with slack for
  // the view offset and the surface curving away at the edges)
  const vc=viewCentreDir();
  const halfDiag=(camDist-1)*Math.tan(camera.fov/2*DEG)*Math.sqrt(1+camera.aspect*camera.aspect);
  const vis=Math.min(Math.acos(1/camDist), Math.asin(Math.min(1,halfDiag))*1.6);
  let resident=0; const wanted=[];
  for(const it of L.items){
    const a=it.c.angleTo(vc);
    if(it.mesh){ resident++; if(a>vis+it.half+L.unloadPad) { unloadItem(L,it); resident--; } }
    else if(!it.loading && a<vis+it.half+L.loadPad) wanted.push([a,it]);
  }
  wanted.sort((x,y)=>x[0]-y[0]);
  for(const [a,it] of wanted){ if(L.busy>=2 || resident+L.busy>=L.cap) break; loadItem(L,it); }
}
const hiShell=new THREE.Group(); earth.add(hiShell);
const detail=new THREE.Group(); earth.add(detail);
const fine=new THREE.Group(); earth.add(fine);
const layers=[];
if(renderer.capabilities.maxTextureSize>=2048 && HI_TILES.length===32){
  const items=[]; for(let j=0;j<4;j++) for(let i=0;i<8;i++) items.push({lon0:-180+i*45, lon1:-135+i*45, lat0:90-(j+1)*45, lat1:90-j*45, src:HI_TILES[j*8+i]});
  layers.push(makeLayer(hiShell, items, R*1.0015, 24, {maxDist:99, loadPad:0.15, unloadPad:0.6, cap:16}));
  layers.push(makeLayer(detail, Z7.map(z=>({lon0:z[0],lon1:z[1],lat0:z[2],lat1:z[3],src:z[4]})), R*1.0025, 10, {maxDist:2.6, loadPad:0.08, unloadPad:0.35, cap:70}));
  layers.push(makeLayer(fine, Z8.map(z=>({lon0:z[0],lon1:z[1],lat0:z[2],lat1:z[3],src:z[4]})), R*1.0035, 6, {maxDist:1.35, loadPad:0.03, unloadPad:0.18, cap:48}));
}
let lastLayerT=0;
function tickLayers(now){ if(now-lastLayerT<250) return; lastLayerT=now; layers.forEach(updateLayer); }

// atmosphere rim glow (symmetric, so it can stay outside the rotating group)
const atmo = new THREE.Mesh(new THREE.SphereGeometry(R*1.035, 64, 48), new THREE.ShaderMaterial({
  transparent:true, side:THREE.BackSide, depthWrite:false, blending:THREE.AdditiveBlending,
  uniforms:{},
  vertexShader:`varying vec3 vN; varying vec3 vP; void main(){ vN=normalize(normalMatrix*normal); vec4 mv=modelViewMatrix*vec4(position,1.0); vP=mv.xyz; gl_Position=projectionMatrix*mv; }`,
  fragmentShader:`varying vec3 vN; varying vec3 vP; void main(){ float f=pow(max(0.0, dot(normalize(vN), normalize(-vP))), 4.0); gl_FragColor=vec4(0.32,0.45,0.85,1.0)*f*0.9; }`
}));
scene.add(atmo);

const markers = new THREE.Group(); earth.add(markers);
// A dot and a pulsing ring lying flat on the surface, centred on the point. (An upright pin with a raised head
// leans away from its base in perspective, so the head never sat where you tapped.)
function makePin(color, r=0.014){
  const g=new THREE.Group();
  const dot=new THREE.Mesh(new THREE.CircleGeometry(r,32), new THREE.MeshBasicMaterial({color,side:THREE.DoubleSide}));
  const ring=new THREE.Mesh(new THREE.RingGeometry(r*1.6,r*2.1,40), new THREE.MeshBasicMaterial({color,transparent:true,opacity:.55,side:THREE.DoubleSide}));
  dot.rotation.x=-Math.PI/2; dot.position.y=0.003; ring.rotation.x=-Math.PI/2; ring.position.y=0.002;
  g.add(dot,ring); return g;
}
function placePin(pin, lat, lon){
  const p=latLonToVec3(lat,lon,R*1.004);
  pin.position.copy(p);
  pin.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), p.clone().normalize());
}
function arcBetween(a, b, color){
  const va=latLonToVec3(a.lat,a.lon), vb=latLonToVec3(b.lat,b.lon);
  const ang=va.angleTo(vb); const pts=[]; const N=64;
  const q0=new THREE.Quaternion(), q1=new THREE.Quaternion().setFromUnitVectors(va.clone().normalize(), vb.clone().normalize());
  for(let i=0;i<=N;i++){
    const t=i/N; const q=q0.clone().slerp(q1,t);
    pts.push(va.clone().applyQuaternion(q).normalize().multiplyScalar(R*(1+0.02+Math.sin(t*Math.PI)*ang*0.12)));
  }
  return new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({color,transparent:true,opacity:.9}));
}

// ---------- Camera / orientation ----------
const Y_AXIS=new THREE.Vector3(0,1,0), X_AXIS=new THREE.Vector3(1,0,0), Z_AXIS=new THREE.Vector3(0,0,1);
function updateCamera(){ camDist=Math.max(MIN_D,Math.min(MAX_D,camDist)); camera.position.set(0,0,camDist); camera.lookAt(0,0,0); }
// Keep north pointing up on screen: undo any roll around the view axis
function levelNorth(strength=1){
  const n=Y_AXIS.clone().applyQuaternion(earth.quaternion);
  // never let the globe flip over a pole: if north would point below the screen's horizontal, pitch back
  if(n.y<0){ earth.quaternion.premultiply(new THREE.Quaternion().setFromAxisAngle(X_AXIS, Math.atan2(n.y,n.z))); n.copy(Y_AXIS).applyQuaternion(earth.quaternion); }
  const m=Math.hypot(n.x,n.y); if(m<0.05) return; // looking straight at a pole: "north up" is meaningless, leave it
  const w=Math.min(1,strength*Math.min(1,m/0.3)); // ease off near the poles so the correction can't yank
  earth.quaternion.premultiply(new THREE.Quaternion().setFromAxisAngle(Z_AXIS, Math.atan2(n.x,n.y)*w));
}
// Orientation that puts (lat,lon) at the screen centre with north up
function quatFacing(lat, lon){
  const f=latLonToVec3(lat,lon).normalize();
  let up=Y_AXIS.clone(); if(Math.abs(f.dot(up))>0.999) up=new THREE.Vector3(0,0,1);
  const u=up.clone().sub(f.clone().multiplyScalar(up.dot(f))).normalize();
  const r=u.clone().cross(f).normalize();
  const m=new THREE.Matrix4().makeBasis(r,u,f); // maps x->r, y->u, z->f
  return new THREE.Quaternion().setFromRotationMatrix(m).invert();
}
function rotateBy(axis, angle){ earth.quaternion.premultiply(new THREE.Quaternion().setFromAxisAngle(axis, angle)); }
function radPerPx(){ return 2*(camDist-1)*Math.tan(camera.fov/2*DEG)/canvas.clientHeight; }
// screen delta -> globe rotation (drag right moves the globe right, drag down moves it down)
function applyDrag(dx,dy){ const k=radPerPx(); rotateBy(Y_AXIS, dx*k); rotateBy(X_AXIS, dy*k); levelNorth(); }

// Frame the globe in the space left between the top bar and the prompt card, whatever the screen shape.
// Everything is measured from the canvas's own box so it stays right even when window.inner* disagrees with the layout.
function layout(){
  const cr=canvas.getBoundingClientRect(); const w=Math.max(1,Math.round(cr.width)), h=Math.max(1,Math.round(cr.height));
  const topEl=document.querySelector('.topbar'), promptEl=document.getElementById('prompt');
  const top=topEl.getBoundingClientRect().bottom-cr.top+6;
  const pr=promptEl.getBoundingClientRect();
  const promptShown=!promptEl.hidden && pr.height>0;
  const bottom=promptShown ? pr.top-cr.top-6 : h-6;
  const freeH=Math.max(120,bottom-top), centerY=(top+bottom)/2;
  camera.aspect=w/h;
  camera.setViewOffset(w,h,0,h/2-centerY,w,h); // shifts the image so the origin lands on centerY
  const targetPx=0.47*Math.min(w-16,freeH);
  const tt=targetPx/(h/2)*Math.tan(camera.fov/2*DEG);
  const wasFit=Math.abs(camDist-FIT_D)<1e-6 || camDist>=MAX_D-1e-6;
  FIT_D=Math.max(2.2, 1/Math.sin(Math.atan(tt)));
  MAX_D=FIT_D;
  if(wasFit || camDist>MAX_D) camDist=FIT_D;
  updateCamera();
}
function resize(){
  const cr=canvas.getBoundingClientRect(); const w=Math.max(1,Math.round(cr.width)), h=Math.max(1,Math.round(cr.height));
  renderer.setSize(w,h,false); layout();
}
addEventListener('resize',resize); resize();
if(window.ResizeObserver){ const ro=new ResizeObserver(()=>resize()); ro.observe(canvas); ro.observe(document.getElementById('prompt')); ro.observe(document.querySelector('.topbar')); }
addEventListener('orientationchange',()=>setTimeout(resize,300));
function recenter(){ // whole globe, centred, keeping the current heading
  tween=null; spin.rate=0; layout();
  const c=hitGlobe(canvas.clientWidth/2, canvas.clientHeight/2) || {lat:20,lon:0};
  flyTo(c.lat, c.lon, FIT_D);
}
earth.quaternion.copy(quatFacing(25,10));

// camera tween (orientation slerp + distance)
let tween=null;
function flyTo(lat, lon, dist){
  tween={t0:performance.now(),dur:900,q0:earth.quaternion.clone(),q1:quatFacing(lat,lon),d0:camDist,d1:Math.max(MIN_D,Math.min(MAX_D,dist))};
}

// ---------- Input ----------
const ray=new THREE.Raycaster();
function screenToNdc(x,y){ const r=canvas.getBoundingClientRect(); return new THREE.Vector2(((x-r.left)/r.width)*2-1, -((y-r.top)/r.height)*2+1); }
function hitGlobe(x,y){ ray.setFromCamera(screenToNdc(x,y),camera); const h=ray.intersectObject(globe)[0]; return h ? vec3ToLatLon(earth.worldToLocal(h.point.clone())) : null; }
// What the pointer is "holding" on the globe: a unit direction (world space) plus the geometry needed to keep a drag
// going off the globe. Inside 80% of the disc that is the surface point under the pointer. Grabbing the true surface
// out to the limb makes the turn rate blow up at the edge and stop dead beyond it, so past that radius the grab angle
// keeps growing at the rate it had at 80%: the same response continues smoothly over the horizon and off the globe.
// The angle is capped short of the far pole; beyond the cap dragTo adds the radial motion directly, so it never stalls.
const GRAB_RHO0=0.8, GRAB_SLOPE=1/Math.sqrt(1-GRAB_RHO0*GRAB_RHO0), GRAB_AMAX=2.6;
const GRAB_RHOCAP=GRAB_RHO0+(GRAB_AMAX-Math.asin(GRAB_RHO0))/GRAB_SLOPE; // radius where the cap starts
function grabAt(x,y){
  ray.setFromCamera(screenToNdc(x,y),camera);
  const o=ray.ray.origin, d=ray.ray.direction; const tc=-o.dot(d);
  const q=o.clone().add(d.clone().multiplyScalar(tc)); const rho=q.length()/R; // ray's closest approach to the centre
  const a = rho<=GRAB_RHO0 ? Math.asin(rho) : Math.min(GRAB_AMAX, Math.asin(GRAB_RHO0)+(rho-GRAB_RHO0)*GRAB_SLOPE);
  const qh=q.normalize(); // radial direction in the view plane (zero vector at the exact centre, which is harmless)
  const dir=qh.clone().multiplyScalar(Math.sin(a)).sub(d.clone().multiplyScalar(Math.cos(a))).normalize();
  const n=d.clone().negate().cross(qh).normalize(); // axis that tilts the grab point further outward
  return {dir, rho, n, capped: a>=GRAB_AMAX};
}
function surfaceDir(x,y){ return grabAt(x,y).dir; }

const pointers=new Map(); let dragging=false, autoSpin=true;
let downPos=null, maxMove=0, grabDir=null, grab=null, lastPinch=0, lastCentroid=null;
let spin={axis:new THREE.Vector3(0,1,0), rate:0}, lastMoveT=0;
   // inertia: rate in rad/ms around a world axis

function dragTo(x,y,prev){
  const now=performance.now(), dt=Math.max(8,now-lastMoveT); lastMoveT=now;
  const g=grabAt(x,y), dir=g.dir;
  if(grabDir){
    let q=new THREE.Quaternion().setFromUnitVectors(grabDir,dir);
    if(g.capped && grab) q.premultiply(new THREE.Quaternion().setFromAxisAngle(g.n, GRAB_SLOPE*(g.rho-Math.max(grab.rho,GRAB_RHOCAP)))); // radial motion beyond the cap
    let ang=2*Math.acos(Math.min(1,Math.abs(q.w)));
    const MAXA=0.35; // cap one event at 20°: a very fast swipe can't produce a wild flip
    if(ang>MAXA){ q=new THREE.Quaternion().slerp(q, MAXA/ang); ang=MAXA; }
    earth.quaternion.premultiply(q); levelNorth();
    if(ang>1e-5){ const s=Math.sqrt(Math.max(1e-12,1-q.w*q.w)); const axis=new THREE.Vector3(q.x/s,q.y/s,q.z/s); const rate=Math.min(0.004, ang/dt);
      // smooth the fling estimate over recent events
      spin.axis.lerp(axis, 0.5).normalize(); spin.rate=spin.rate*0.5+rate*0.5; }
    else spin.rate*=0.5;
  } else { applyDrag(x-prev.x,y-prev.y); spin.rate=0; }
  grabDir=dir; grab=g;
}

canvas.addEventListener('pointerdown',e=>{
  if(e.button!==undefined && e.button!==0 && e.pointerType==='mouse') return;
  e.preventDefault();
  try{ canvas.setPointerCapture(e.pointerId); }catch(_){}
  pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
  tween=null; autoSpin=false; spin.rate=0; dragging=true; canvas.classList.add('dragging');
  if(pointers.size===1){ downPos={x:e.clientX,y:e.clientY}; maxMove=0; grab=grabAt(e.clientX,e.clientY); grabDir=grab.dir; lastMoveT=performance.now(); }
  else { grabDir=null; grab=null; maxMove=99; lastPinch=0; lastCentroid=null; }
});
canvas.addEventListener('pointermove',e=>{
  if(!pointers.has(e.pointerId)) return;
  const prev=pointers.get(e.pointerId); pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
  if(downPos) maxMove=Math.max(maxMove, Math.hypot(e.clientX-downPos.x,e.clientY-downPos.y));
  if(pointers.size===1){ dragTo(e.clientX,e.clientY,prev); }
  else if(pointers.size===2){
    const [a,b]=[...pointers.values()]; const d=Math.hypot(a.x-b.x,a.y-b.y); const c={x:(a.x+b.x)/2,y:(a.y+b.y)/2};
    if(lastPinch){ camDist*=lastPinch/d; updateCamera(); }
    if(lastCentroid){ applyDrag(c.x-lastCentroid.x,c.y-lastCentroid.y); }
    lastPinch=d; lastCentroid=c;
  }
});
function endPointer(e){
  if(!pointers.has(e.pointerId)) return;
  pointers.delete(e.pointerId); lastPinch=0; lastCentroid=null;
  if(pointers.size===1){ const rest=[...pointers.values()][0]; grab=grabAt(rest.x,rest.y); grabDir=grab.dir; maxMove=99; downPos=null; }
  if(pointers.size===0){
    dragging=false; canvas.classList.remove('dragging');
    if(downPos && maxMove<8 && e.type==='pointerup'){ spin.rate=0; tapAt(downPos.x,downPos.y); } // where the finger landed, not where it lifted
    else if(performance.now()-lastMoveT>80){ spin.rate=0; } // finger paused before lifting: no fling
    downPos=null; grabDir=null; grab=null;
  }
}
canvas.addEventListener('pointerup',endPointer); canvas.addEventListener('pointercancel',endPointer);
// iOS: stop the host page from scrolling/zooming while we drag on the canvas
['touchstart','touchmove','touchend'].forEach(t=>canvas.addEventListener(t,e=>{ if(e.cancelable) e.preventDefault(); },{passive:false}));
canvas.addEventListener('contextmenu',e=>e.preventDefault());
canvas.addEventListener('wheel',e=>{
  e.preventDefault(); autoSpin=false; tween=null;
  const d = e.deltaMode===1 ? e.deltaY*16 : e.deltaMode===2 ? e.deltaY*400 : e.deltaY;
  camDist*=Math.exp(Math.max(-60,Math.min(60,d))*0.0025); updateCamera();
},{passive:false});
addEventListener('keydown',e=>{
  if(e.target && /INPUT|TEXTAREA|BUTTON/.test(e.target.tagName)) return;
  const step=40;
  if(e.key==='ArrowLeft'){applyDrag(step,0);} else if(e.key==='ArrowRight'){applyDrag(-step,0);}
  else if(e.key==='ArrowUp'){applyDrag(0,step);} else if(e.key==='ArrowDown'){applyDrag(0,-step);}
  else if(e.key==='+'||e.key==='='){camDist/=1.15;} else if(e.key==='-'){camDist*=1.15;} else return;
  autoSpin=false; tween=null; updateCamera(); e.preventDefault();
});

function tapAt(x,y){
  if(state.phase!=='guess') return;
  const ll=hitGlobe(x,y); if(!ll) return;
  state.guess=ll; placePin(guessPin, ll.lat, ll.lon); guessPin.visible=true;
  ui.confirm.disabled=false; ui.hint.textContent=`Pin at ${ll.lat.toFixed(1)}°, ${ll.lon.toFixed(1)}° — tap again to move it.`;
}

// ---------- Game state ----------
const ui={}; ['modeline','score','rounddots','city','country','hint','fact','result','km','pts','confirm','next','sheet','sheetMeta','total','rows','copy','replay','close','toast','tag','mDaily','mPractice','prompt'].forEach(id=>ui[id]=document.getElementById(id));
const guessPin=makePin(0xFF7A59); guessPin.visible=false; markers.add(guessPin);
const truthPin=makePin(0x6EE7A4, 0.012); truthPin.visible=false; markers.add(truthPin);
let arcLine=null;
const state={mode:'daily', seed:0, cities:[], round:0, results:[], phase:'guess', guess:null};

function modeLabel(){ return state.mode==='daily' ? `Daily · ${new Date().toLocaleDateString(undefined,{month:'short',day:'numeric'})}` : `Practice · #${state.seed%10000}`; }

function start(mode){
  state.mode=mode;
  state.seed = mode==='daily' ? seedFromDate(new Date()) : Math.floor(Math.random()*1e9);
  state.cities=pickFive(state.seed); state.round=0; state.results=[]; state.phase='guess'; state.guess=null;
  ui.mDaily.classList.toggle('on',mode==='daily'); ui.mPractice.classList.toggle('on',mode!=='daily');
  ui.modeline.textContent=modeLabel(); ui.sheet.classList.remove('open');
  clearMarks(); ui.score.textContent='0';
  const saved = mode==='daily' && store.get('nightfall:'+dateKey(new Date()));
  if(saved){ state.results=saved; state.round=5; showSheet(true); ui.prompt.hidden=true; setTimeout(recenter,50); return; }
  ui.prompt.hidden=false;
  showRound();
}
function clearMarks(){ guessPin.visible=false; truthPin.visible=false; if(arcLine){markers.remove(arcLine); arcLine=null;} ui.tag.style.display='none'; }
function showRound(){
  const c=state.cities[state.round]; state.phase='guess'; state.guess=null; clearMarks(); canvas.classList.add('pinning');
  if(state.round>0 || camDist<FIT_D-0.01) recenter();
  ui.city.textContent=c[0]; ui.country.textContent=c[1];
  ui.hint.hidden=false; ui.hint.textContent='Spin the globe, then tap where you think it is.';
  ui.fact.hidden=true; ui.result.hidden=true; ui.confirm.hidden=false; ui.confirm.disabled=true; ui.next.hidden=true;
  ui.rounddots.innerHTML=state.cities.map((_,i)=>`<i class="${i<state.round?'done':i===state.round?'cur':''}"></i>`).join('');
}
ui.confirm.addEventListener('click',()=>{
  if(!state.guess) return;
  const c=state.cities[state.round]; const truth={lat:c[2],lon:c[3]};
  const km=haversine(state.guess,truth), pts=pointsFor(km);
  state.results.push({name:c[0],country:c[1],km,pts,guess:state.guess,truth});
  state.phase='reveal'; canvas.classList.remove('pinning');
  placePin(truthPin,truth.lat,truth.lon); truthPin.visible=true;
  arcLine=arcBetween(state.guess,truth,0xF5B63E); markers.add(arcLine);
  ui.km.innerHTML=`${fmtKm(km)}<small>km off</small>`; ui.pts.innerHTML=`+${pts}<small>pts</small>`;
  ui.result.hidden=false; ui.hint.hidden=true; ui.fact.textContent=c[4]; ui.fact.hidden=false;
  ui.confirm.hidden=true; ui.next.hidden=false; ui.next.textContent = state.round===4 ? 'See results' : 'Next city';
  ui.score.textContent=state.results.reduce((s,r)=>s+r.pts,0);
  ui.tag.textContent=c[0]; ui.tag.style.display='block';
  // fly to midpoint
  const mid=latLonToVec3(state.guess.lat,state.guess.lon).add(latLonToVec3(truth.lat,truth.lon));
  const ml = mid.length()<1e-3 ? truth : vec3ToLatLon(mid);
  const d=Math.min(MAX_D, Math.max(1.8, 1.6 + km/4000));
  flyTo(ml.lat, ml.lon, d);
});
ui.next.addEventListener('click',()=>{
  state.round++;
  if(state.round>=5){ if(state.mode==='daily') store.set('nightfall:'+dateKey(new Date()), state.results); showSheet(false); }
  else showRound();
});

function square(km){ return km<250?'🟩':km<1000?'🟨':km<3000?'🟧':'🟥'; }
function squareColor(km){ return km<250?'#6EE7A4':km<1000?'#F5B63E':km<3000?'#F0803C':'#E0525A'; }
function showSheet(fromSave){
  const total=state.results.reduce((s,r)=>s+r.pts,0); ui.score.textContent=total;
  document.getElementById('sheetTitle').textContent = state.mode==='daily' ? "Tonight's five" : 'Practice round';
  ui.sheetMeta.textContent = (state.mode==='daily' ? new Date().toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'}) : `Set #${state.seed%10000}`) + (fromSave?' · already played today':'');
  ui.total.textContent=total;
  ui.rows.innerHTML=state.results.map(r=>`<tr><td><span class="sq" style="background:${squareColor(r.km)}"></span>${r.name}<div class="c" style="padding-left:20px">${r.country}</div></td><td class="num">${fmtKm(r.km)} km</td><td class="num">${r.pts}</td></tr>`).join('');
  ui.replay.textContent = state.mode==='daily' ? 'Practice round' : 'New practice set';
  ui.sheet.classList.add('open');
}
ui.copy.addEventListener('click',async()=>{
  const total=state.results.reduce((s,r)=>s+r.pts,0);
  const head = state.mode==='daily' ? `Nightfall Globe · ${dateKey(new Date())}` : `Nightfall Globe · practice #${state.seed%10000}`;
  const text=`${head}\n${state.results.map(r=>square(r.km)).join('')} ${total}/5000\n${state.results.map(r=>`${square(r.km)} ${r.name} — ${fmtKm(r.km)} km`).join('\n')}`;
  try{ await navigator.clipboard.writeText(text); toast('Copied to clipboard'); }catch(e){ toast('Copy blocked — select the table instead'); }
});
ui.replay.addEventListener('click',()=>start('practice'));
ui.close.addEventListener('click',()=>{ ui.sheet.classList.remove('open'); ui.prompt.hidden = state.mode==='daily' && state.round>=5; setTimeout(recenter,50); });
ui.mDaily.addEventListener('click',()=>start('daily'));
ui.mPractice.addEventListener('click',()=>start('practice'));
function toast(msg){ ui.toast.textContent=msg; ui.toast.classList.add('show'); setTimeout(()=>ui.toast.classList.remove('show'),1600); }

// ---------- Loop ----------
const ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
function frame(now){
  if(tween){ const tt=Math.min(1,(now-tween.t0)/tween.dur), k=ease(tt); earth.quaternion.copy(tween.q0).slerp(tween.q1,k); camDist=tween.d0+(tween.d1-tween.d0)*k; updateCamera(); if(tt>=1) tween=null; }
  else if(!dragging && spin.rate>1e-6){ rotateBy(spin.axis, Math.min(0.25, spin.rate*16)); levelNorth(0.5); spin.rate*=0.93; if(spin.rate<2e-5) spin.rate=0; }
  else if(autoSpin && !dragging){ rotateBy(Y_AXIS, 0.0008); }
  // pulse rings
  const s=1+0.12*Math.sin(now/300); const ps=Math.max(0.3,Math.min(1,(camDist-1)/(FIT_D-1))); [guessPin,truthPin].forEach(p=>{ if(p.visible){ p.scale.setScalar(ps); p.children[1].scale.set(s,s,1);} });
  // tag position
  if(truthPin.visible){
    const v=truthPin.getWorldPosition(new THREE.Vector3()); const facing = v.clone().normalize().z>0.15;
    v.project(camera); ui.tag.style.display=facing?'block':'none';
    const cr=canvas.getBoundingClientRect(); ui.tag.style.left=(cr.left+(v.x+1)/2*cr.width)+'px'; ui.tag.style.top=(cr.top+(1-v.y)/2*cr.height)+'px';
  }
  tickLayers(now);
  renderer.render(scene,camera); requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
start('daily');
