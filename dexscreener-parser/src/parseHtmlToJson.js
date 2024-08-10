const fs = require('fs');
const cheerio = require('cheerio');

// Read the HTML file
const html = fs.readFileSync('table.html', 'utf-8');

// Load HTML into cheerio
const $ = cheerio.load(html);

// Define the keys for each item
const keys = [
	'Token',
	'Price',
	'Age',
	'Txns',
	'Volume',
	'Makers',
	'5m',
	'1h',
	'6h',
	'24h',
	'Liquidity',
	'MCAP'
];

// Function to parse the table HTML into JSON format
function parseTable() {
	const rows = [];
	
	// Iterate over each row with class 'ds-dex-table-row'
	$('.ds-dex-table-row').each((index, row) => {
		const rowData = {};
		
		// Iterate over each cell with class 'ds-table-data-cell'
		$(row).find('.ds-table-data-cell').each((cellIndex, cell) => {
			if (keys[cellIndex]) {
				rowData[keys[cellIndex]] = $(cell).text().trim();
			}
		});
		
		if (Object.keys(rowData).length > 0) {
			rows.push(rowData);
		}
	});
	
	return rows;
}

// Parse the table and save as JSON
const tableData = parseTable();
fs.writeFileSync('data.json', JSON.stringify(tableData, null, 2));

console.log('Data parsed and saved to data.json');
