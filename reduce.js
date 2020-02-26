const Big = require( "big.js" );

Big.DP = 2000;

const numToReduce = Big( process.argv[2] );

const reduce = ( running, str ) => {
	console.log( "This is reduce; I have running of " );
	console.log( running.toFixed() );
	console.log( "And I have str of " );
	console.log( str );

	if( running.toPrecision().length < 10 ){
		return "+"+str+";";
	}else{

		const best = [ 2, 3, 5, 6, 7, 8, 9 ].reverse().map( ( baseNum ) => {

			//console.log( "Testing base " + baseNum );

			// Some stupidly huge number that should be optimized more
			// at a later point
			let currentHighestExp = 1000;

			while(
				Big( running ).minus(
					Big(baseNum).pow( currentHighestExp )
				).lte( 0 ) ) {
				
				// Get smaller
				currentHighestExp = currentHighestExp-1;
			}

			const _new = running.minus( Big( baseNum ).pow( currentHighestExp ) );

			strToUse = str + baseNum + "^10e" + currentHighestExp.toFixed() + ";";

			return { baseNum, _new, strToUse };
		} ).reduce( ( best, c ) => {
			if( !best ){
				return c;
			}

			const bestLength = best._new.toFixed().length+best.strToUse.length;
			const cLength = c._new.toFixed().length+c.strToUse.length;

			if( cLength < bestLength ){
				best = c;
			}
			return best;
		}, null );

		//str = str + best.strToUse;

		if( best._new.s > 0 ){
			return reduce( best._new, best.strToUse );
		}else{
			console.log( "This should never happen." );
		}
	}
};
console.log( reduce( numToReduce,  "" ) );
