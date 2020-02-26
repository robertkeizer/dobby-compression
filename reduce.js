const Big = require( "big.js" );

Big.DP = 20000;

//const basesToCheck = [ 2 ];
const basesToCheck = [ 10, 9, 8, 7, 6, 5, 4, 3, 2];
//const basesToCheck = [ 10, 2, 3, 5, 7, 11, 13, 17, 23, 27, 31 ];
//const basesToCheck = [ 10, 2, 3, 5, 7, 11, 13, 17, 23, 27, 31 ];

const numToReduce = Big( process.argv[2] );

const mergeFormula = ( str ) => {
	//console.log( "This is mergeFormula; I have str of " );
	//console.log( str );

	/*

	This functions but needs to be cleaned
	up to handle cases when we're doing different
	operations, due to dividing and then subtracting..

	const parts = str.split(";");

	let running = 0;
	let bases = { };

	let lastPart = undefined;
	parts.forEach( ( part ) => {
		if( part == "" ){
			return;
		}
		if( part.match( /^[0-9]*\^[0-9]*$/ ) ){
			const matchSplit = part.split("^");

			if( !bases[matchSplit[0]] ){
				bases[matchSplit[0]] = parseInt( matchSplit[1] );
			}else{
				bases[matchSplit[0]] += parseInt( matchSplit[1] );
			}

			lastPart = "base";
		}else if( part.match( /^[\-\+][0-9]$/ ) ){
			if( lastPart == "base" ){
				running = running + parseInt( part );
			}else{
				clearNow( 
		}
	} );


	let returnString = "";
	Object.keys( bases ).forEach( ( base ) => {
		returnString += base + "^" + bases[base] + ";";
	} ); 

	returnString += running + ";";
	
	//console.log( returnString );
	return returnString;

	*/

	return str;
};

const reduce = ( running, str ) => {

	if( str !== "" ){
		//console.log( running.toFixed() );
		console.log( running.toFixed().length + " digit number and '" + str + "'");
	}

	if( running.toPrecision().length < 10 ){
		return str+"+"+running.toFixed()+";";
	}else{

		const best = basesToCheck.map( ( baseNum ) => {

			//console.log( "Testing base " + baseNum );

			// Some stupidly huge number that should be optimized more
			// at a later point
			let currentHighestExp = 100;

			let keepDecrementing = true;
			let badBase = false;

			while( keepDecrementing ){

				if( Big( baseNum ).pow( currentHighestExp ).gt( running ) ){
					currentHighestExp = currentHighestExp-1;
					//console.log( "Skipping " + baseNum + "^" + currentHighestExp + " because its too big" );
					continue;
				}

				//console.log( "Testing " + baseNum + "^" + currentHighestExp );

				if( currentHighestExp == 1){
					badBase = true;
					keepDecrementing = false;
					break;
				}

				const _quotient = Big( running ).div( Big( baseNum ).pow( currentHighestExp ) );

				const _mod = Big( running ).mod( Big( baseNum ).pow( currentHighestExp ) );

				/*

				TODO; This needs to be updated with
				the particulars around handling when we hit a multiple still.

				console.log( _quotient.toFixed() );
				console.log( _mod.toFixed() );
				process.exit(1);
				*/

				// We want to check if we just hit a modululo of either the number itself
				// or a multiple of the number.. so we check if we have a whole number
				// here.
				if( _mod.eq(0) ){
					keepDecrementing = false;
					break;
				}

				// Get smaller
				currentHighestExp = currentHighestExp-1;
			}

			if( badBase ){
				//console.log( "Skipping bad base of " + baseNum );
				//process.exit(1);
				return { badBase };
			}

			const _mod = Big( running ).mod( Big( baseNum ).pow( currentHighestExp ) );
			const _quotient = Big( running ).div( Big( baseNum ).pow( currentHighestExp ) );

			const _new = _quotient.plus( _mod );

			strToUse = str + baseNum + "^" + currentHighestExp.toFixed() + ";";

			return { baseNum, _new, strToUse };
		} ).reduce( ( best, c ) => {

			if( c.badBase ){ return best; }

			if( !best ){ return c; }

			const bestLength = best._new.toFixed().length+best.strToUse.length;
			const cLength = c._new.toFixed().length+c.strToUse.length;

			if( cLength < bestLength ){
				best = c;
			}
			return best;
		}, null );

		if( !best ){
			// Couldn't factor; Let's go ahead and
			// subtract 1 from the number and do it again
			
			return reduce( running.minus(1), str + "-1;" )
		}

		// Let's go ahead and mangle the str to remove any duplicate
		// bases that exist
		const realStrToUse = mergeFormula( best.strToUse )

		if( best._new.s > 0 ){
			return reduce( best._new, realStrToUse);
		}else{
			console.log( "This should never happen." );
		}
	}
};
console.log( reduce( numToReduce,  "" ) );
