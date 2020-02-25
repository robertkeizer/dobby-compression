const events = require( "events" );
const { PerformanceObserver, performance } = require( "perf_hooks" );

const CellularAutomata = require( "cellular-automata" );

class GenerateFunc extends events.EventEmitter{
	constructor( config ){

		super( );

		this.inst = new CellularAutomata( config.dimensions );
		this.inst.setRule( config.rule );

		this.config = config;
	}

	findSequence( sequence, cb ){
		this.inst.fillWithDistribution([[0, 95], [1, 5]]);

		const _count = 1000;
		const _start = performance.now();
		this.inst.iterate( _count );
		const _end = performance.now();
		
		console.log( ( _end - _start ) / _count );
	}
}

module.exports = GenerateFunc;
