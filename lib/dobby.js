const events	= require( "events" );

const async	= require( "async" );
const uuidv4	= require( "uuid/v4" );

const GenerateFunc = require( "./generate-func" );

class Dobby extends events.EventEmitter{
	constructor( ){
		super();
		this._chunks = { };

		this.config = {
			maxEnumEntryLength: 1000,
			machines: [
				{
					rule: "135/17", 
					dimensions: [
						300,
						50
					]
				}
			]
		};

	}

	_newChunk( ){
		const _uuid = uuidv4();
		this._chunks[_uuid] = {
			state: "running",
			_shouldStop: false,
			_machines: [ ]
		};
		return _uuid;
	}

	_getBinaryForChunk( chunk, cb ){
		//STUB
		return cb( null, [ 0, 1 ] );
	}

	_generateForChunk( _ident, cb ){
		const nextMachineIndex = this._chunks[_ident]._machines.length;
		if( nextMachineIndex > this.config.machines.length ){
			return cb( "looping_machines" );
		}

		const opts = this.config.machines[nextMachineIndex];

		const inst = new GenerateFunc( opts );

		// Because we're just going by the index, we can just
		// shove the date into the array..
		this._chunks[_ident]._machines.push( new Date( ) );

		return cb( null, inst );
	}

	shrink( chunk ){

		const _ident = this._newChunk( );

		async.waterfall( [ ( cb ) => {

			this._getBinaryForChunk( chunk, cb );

		}, ( sequenceToFind, cb ) => {

			// Shove into instance wide state so that
			// we can query externally

			async.whilst( ( cb ) => {
				return cb( null, !this._chunks[_ident]._shouldStop );
			}, ( cb ) => {

				async.waterfall( [ ( cb ) => {

					// Let's go ahead and generate a function
					// that will hit the power set of the enum
					// of the chunk.

					this._generateForChunk( _ident, cb );

				}, ( generatingFunc, cb ) => {

					// Let's now determine the position 
					// of the chunk inside this function.

					generatingFunc.on( "searchTimeout", ( ) => {
						// Based on the config
						return cb( true );
					} );

					generatingFunc.findSequence( sequenceToFind, ( err, position ) => {
						return cb( err, position, generatingFunc );
					} );

				}, ( position, generatingFunc, cb ) => {

					// Make some calculations as to if
					// this represents any kind of
					// compression.

				} ], ( err, result ) => {
					if( err && err !== true ){ return cb( err ); }
					
					// If true was passed in to short circuit
					if( !result ){ return cb( null ); }
				} );

			}, cb );

		} ], ( err ) => {
			if( err ){ return this._error( err ); }
		} );
	}

	_doneShrunk( shrunkObj ){
		this.emit( "shrunk", shrunkObj );
	}

	_error( err ){
		this.emit( "error", err );
	}
}

module.exports = Dobby;
