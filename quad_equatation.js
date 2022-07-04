/*
 * the below function gets a b c as string
 * and returns abc as float type array
 */
function get_nums(abc_str) {
		let abc = abc_str.split(' ')
		let nums = [0, 0, 0]
		nums[0] = parseFloat(abc[0])
		nums[1] = parseFloat(abc[1])
		nums[2] = parseFloat(abc[2])
		return nums
}

/*
 * the below function gets a b c as float type array
 * and roots as float type array
 */
function solve(abc) {
	try {
		let a = Number(abc[0])
		let b = Number(abc[1])
		let c = Number(abc[2])
		if (isNaN(a) || isNaN(b) || isNaN(c)) {
                        throw "Invalid Value"
                }
		let roots = [0, 0]
		roots[0] = (-1 * b + Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a);
		roots[1] = (-1 * b - Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a);
		return roots
	}
	catch (err) {
                console.log("No numeric type")
                process.exit(0);
	}
}

/*
 * the below function gets roots as float type array
 * compares them with those in golden.txt
 * and return true if match and false if not match
 */
function test(roots) {
	const fs = require("fs");
	const buffer = fs.readFileSync('golden.txt');
	golds_str = buffer.toString()
	let golds = get_nums(golds_str)
	let gx = [0, 0]
	gx[0] = parseFloat(golds[0])
	gx[1] = parseFloat(golds[1])
	if((roots[0] == gx[0] && roots[1] == gx[1]) || (roots[1] == gx[0] && roots[0] == gx[1])) {
		return true
	} else {
		return false
	}
}

/*
 * the below function gets roots as float type array and test result
 * generates output.txt containing the results with feedback
 * according the rusult
 */
function generate_output_file(roots, test_result) {
	const fs = require('fs')
	let content = roots[0].toString() + '   ' + roots[1].toString()
	if(test_result) {
		content += '  Rught result\n'
	} else {
		content += '  Wrong result\n'
	}
	fs.writeFile('output.txt', content, err => {
		if (err) {
			console.error(err)
			return
		}
	})
}

function read_from_file() {
	try {
		let arguments = process.argv;
		const fs = require("fs");
		const buffer = fs.readFileSync(arguments[2]);
		expr = buffer.toString()
		return expr
	}
	catch (err) {
		console.log("Input File not exist")
                process.exit(0);
	}
}

function main() {
		let expr = read_from_file()
		let roots = solve(get_nums(expr))
		generate_output_file(roots, test(roots))
}

main();
