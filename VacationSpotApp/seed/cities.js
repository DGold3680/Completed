const usa = [
    {
        city: "New York",
        growth_from_2000_to_2013: "4.8%",
        latitude: 40.7127837,
        longitude: -74.0059413,
        population: "8405837",
        rank: "1",
        state: "New York",
    },
    {
        city: "Los Angeles",
        growth_from_2000_to_2013: "4.8%",
        latitude: 34.0522342,
        longitude: -118.2436849,
        population: "3884307",
        rank: "2",
        state: "California",
    },
    {
        city: "Chicago",
        growth_from_2000_to_2013: "-6.1%",
        latitude: 41.8781136,
        longitude: -87.6297982,
        population: "2718782",
        rank: "3",
        state: "Illinois",
    },
    {
        city: "Houston",
        growth_from_2000_to_2013: "11.0%",
        latitude: 29.7604267,
        longitude: -95.3698028,
        population: "2195914",
        rank: "4",
        state: "Texas",
    },
    {
        city: "Philadelphia",
        growth_from_2000_to_2013: "2.6%",
        latitude: 39.9525839,
        longitude: -75.1652215,
        population: "1553165",
        rank: "5",
        state: "Pennsylvania",
    },
    {
        city: "Phoenix",
        growth_from_2000_to_2013: "14.0%",
        latitude: 33.4483771,
        longitude: -112.0740373,
        population: "1513367",
        rank: "6",
        state: "Arizona",
    },
    {
        city: "San Antonio",
        growth_from_2000_to_2013: "21.0%",
        latitude: 29.4241219,
        longitude: -98.49362819999999,
        population: "1409019",
        rank: "7",
        state: "Texas",
    },
    {
        city: "San Diego",
        growth_from_2000_to_2013: "10.5%",
        latitude: 32.715738,
        longitude: -117.1610838,
        population: "1355896",
        rank: "8",
        state: "California",
    },
    {
        city: "Dallas",
        growth_from_2000_to_2013: "5.6%",
        latitude: 32.7766642,
        longitude: -96.79698789999999,
        population: "1257676",
        rank: "9",
        state: "Texas",
    },
    {
        city: "San Jose",
        growth_from_2000_to_2013: "10.5%",
        latitude: 37.3382082,
        longitude: -121.8863286,
        population: "998537",
        rank: "10",
        state: "California",
    },
    {
        city: "Austin",
        growth_from_2000_to_2013: "31.7%",
        latitude: 30.267153,
        longitude: -97.7430608,
        population: "885400",
        rank: "11",
        state: "Texas",
    },
    {
        city: "Indianapolis",
        growth_from_2000_to_2013: "7.8%",
        latitude: 39.768403,
        longitude: -86.158068,
        population: "843393",
        rank: "12",
        state: "Indiana",
    },
    {
        city: "Jacksonville",
        growth_from_2000_to_2013: "14.3%",
        latitude: 30.3321838,
        longitude: -81.65565099999999,
        population: "842583",
        rank: "13",
        state: "Florida",
    },
    {
        city: "San Francisco",
        growth_from_2000_to_2013: "7.7%",
        latitude: 37.7749295,
        longitude: -122.4194155,
        population: "837442",
        rank: "14",
        state: "California",
    },
    {
        city: "Columbus",
        growth_from_2000_to_2013: "14.8%",
        latitude: 39.9611755,
        longitude: -82.99879419999999,
        population: "822553",
        rank: "15",
        state: "Ohio",
    },
    {
        city: "Charlotte",
        growth_from_2000_to_2013: "39.1%",
        latitude: 35.2270869,
        longitude: -80.8431267,
        population: "792862",
        rank: "16",
        state: "North Carolina",
    },
    {
        city: "Fort Worth",
        growth_from_2000_to_2013: "45.1%",
        latitude: 32.7554883,
        longitude: -97.3307658,
        population: "792727",
        rank: "17",
        state: "Texas",
    },
    {
        city: "Detroit",
        growth_from_2000_to_2013: "-27.1%",
        latitude: 42.331427,
        longitude: -83.0457538,
        population: "688701",
        rank: "18",
        state: "Michigan",
    },
    {
        city: "El Paso",
        growth_from_2000_to_2013: "19.4%",
        latitude: 31.7775757,
        longitude: -106.4424559,
        population: "674433",
        rank: "19",
        state: "Texas",
    },
    {
        city: "Memphis",
        growth_from_2000_to_2013: "-5.3%",
        latitude: 35.1495343,
        longitude: -90.0489801,
        population: "653450",
        rank: "20",
        state: "Tennessee",
    },
    {
        city: "Seattle",
        growth_from_2000_to_2013: "15.6%",
        latitude: 47.6062095,
        longitude: -122.3320708,
        population: "652405",
        rank: "21",
        state: "Washington",
    },
    {
        city: "Denver",
        growth_from_2000_to_2013: "16.7%",
        latitude: 39.7392358,
        longitude: -104.990251,
        population: "649495",
        rank: "22",
        state: "Colorado",
    },
    {
        city: "Washington",
        growth_from_2000_to_2013: "13.0%",
        latitude: 38.9071923,
        longitude: -77.0368707,
        population: "646449",
        rank: "23",
        state: "District of Columbia",
    },
    {
        city: "Boston",
        growth_from_2000_to_2013: "9.4%",
        latitude: 42.3600825,
        longitude: -71.0588801,
        population: "645966",
        rank: "24",
        state: "Massachusetts",
    },
    {
        city: "Nashville-Davidson",
        growth_from_2000_to_2013: "16.2%",
        latitude: 36.1626638,
        longitude: -86.7816016,
        population: "634464",
        rank: "25",
        state: "Tennessee",
    },
    {
        city: "Baltimore",
        growth_from_2000_to_2013: "-4.0%",
        latitude: 39.2903848,
        longitude: -76.6121893,
        population: "622104",
        rank: "26",
        state: "Maryland",
    },
    {
        city: "Oklahoma City",
        growth_from_2000_to_2013: "20.2%",
        latitude: 35.4675602,
        longitude: -97.5164276,
        population: "610613",
        rank: "27",
        state: "Oklahoma",
    },
    {
        city: "Louisville/Jefferson County",
        growth_from_2000_to_2013: "10.0%",
        latitude: 38.2526647,
        longitude: -85.7584557,
        population: "609893",
        rank: "28",
        state: "Kentucky",
    },
    {
        city: "Portland",
        growth_from_2000_to_2013: "15.0%",
        latitude: 45.5230622,
        longitude: -122.6764816,
        population: "609456",
        rank: "29",
        state: "Oregon",
    },
    {
        city: "Las Vegas",
        growth_from_2000_to_2013: "24.5%",
        latitude: 36.1699412,
        longitude: -115.1398296,
        population: "603488",
        rank: "30",
        state: "Nevada",
    },
    {
        city: "Milwaukee",
        growth_from_2000_to_2013: "0.3%",
        latitude: 43.0389025,
        longitude: -87.9064736,
        population: "599164",
        rank: "31",
        state: "Wisconsin",
    },
    {
        city: "Albuquerque",
        growth_from_2000_to_2013: "23.5%",
        latitude: 35.0853336,
        longitude: -106.6055534,
        population: "556495",
        rank: "32",
        state: "New Mexico",
    },
    {
        city: "Tucson",
        growth_from_2000_to_2013: "7.5%",
        latitude: 32.2217429,
        longitude: -110.926479,
        population: "526116",
        rank: "33",
        state: "Arizona",
    },
    {
        city: "Fresno",
        growth_from_2000_to_2013: "18.3%",
        latitude: 36.7468422,
        longitude: -119.7725868,
        population: "509924",
        rank: "34",
        state: "California",
    },
     {
        city: "Norfolk",
        growth_from_2000_to_2013: "5.0%",
        latitude: 36.8507689,
        longitude: -76.28587259999999,
        population: "246139",
        rank: "81",
        state: "Virginia",
    },
    {
        city: "Durham",
        growth_from_2000_to_2013: "29.9%",
        latitude: 35.9940329,
        longitude: -78.898619,
        population: "245475",
        rank: "82",
        state: "North Carolina",
    },
    {
        city: "Madison",
        growth_from_2000_to_2013: "15.8%",
        latitude: 43.0730517,
        longitude: -89.4012302,
        population: "243344",
        rank: "83",
        state: "Wisconsin",
    },
    {
        city: "Lubbock",
        growth_from_2000_to_2013: "19.6%",
        latitude: 33.5778631,
        longitude: -101.8551665,
        population: "239538",
        rank: "84",
        state: "Texas",
    },
    {
        city: "Irvine",
        growth_from_2000_to_2013: "61.3%",
        latitude: 33.6839473,
        longitude: -117.7946942,
        population: "236716",
        rank: "85",
        state: "California",
    },
    {
        city: "Pembroke Pines",
        growth_from_2000_to_2013: "17.4%",
        latitude: 26.007765,
        longitude: -80.2962555,
        population: "162329",
        rank: "150",
        state: "Florida",
    },
    {
        city: "Elk Grove",
        growth_from_2000_to_2013: "97.1%",
        latitude: 38.4087993,
        longitude: -121.3716178,
        population: "161007",
        rank: "151",
        state: "California",
    }]
    
    
 exports.usa=usa