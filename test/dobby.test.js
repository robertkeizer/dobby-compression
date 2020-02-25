const { Dobby } = require( "../lib/index" );

const fs = require( "fs" );

describe( "Dobby", function( ){
	it( "Main", function( cb ){
		this.timeout( 20000 );
		const inst = new Dobby( );

		inst.once( "shrunk", ( shrunkObj ) => {
			console.log( "I have shrunk obj of " );
			console.log( shrunkObj );
		} );

		inst.shrink( fs.readFileSync( "./test/dobby.test.js", { encoding: "utf8" } ) );

	} );
} );
