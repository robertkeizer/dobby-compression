# dobby-compression

```
Assuming a dictionary of A, B, C, ... Z.

A function exists to generate every possible list of possible inputs, of a given length. Put another way, it is possible to generate all possible combinations of any 3 elements of the dictionary.

The position of this array is dictated by the generating function.

For length of 1 the array is the following
[ A, B, C, ... Z ]

For length 2 the array is the following
[ 
	[ A, A ], ... [ A, Z ],
	[ B, A ], ... [ B, Z ],
	...
	[ Z, A ], ... [ Z, Z ]
]

For length 3 the array is the following
[
	[ A, A, A ], ... [ A, Z, Z ],
	[ B, A, A ], ... [ B, Z, Z ]
	...
	[ Z, Z, A ], ... [ Z, Z, Z ]
]

It follows then that there exists a single unique position in this output that exactly contains the desired array of a given length. 

It is possible to use this unique position as a placeholder, representing the actual data.

Furthmore, it is possible to represent this position in a way that is substantially less than the original array, assuming the array is large enough.


Note that the output of the generating function is summative in that the length of [ A, A ] in the output would be the 27th element ( at position 26 due to 0 indexing ) and not the first element.

In this example, [ B, A ] exists in the 52nd element.

Similarly [ A, A, A ] exists at the 702nd element.

	Len(1) = 26
	Len(2) = Len(1)*Len(1) = 676
	
	Index(1) = 0;
	Index(2) = Len(1)				= 26;
	Index(3) = Len(1) + Len(2)	= 26 + 676	= 702;
```


Thoughts ( march 1 2020 ):

	*	Should expand the reduce to include the notion of summation of series..
		this would enable a small function to be defined that takes in a given
		position or count, etc.

		Functions such as Sin( x ) could also be used so as to 


	*	Can the intersection between two known functions, where the relationship between the functions is
		very well understood be used as a way to determine the values of the functions to get to an 
		intersection point?

		Imagine a 2d grid, with sin(a) and cos(b). For given values of a,b, there could exist some point
		(x,y) that intersects both. This could be used as an index value of the above, resulting in the
		requirement to simply pass a, b, and the refs of the functions used.

		The intersection point of the functions would allow for effectively arbitrary precision through
		the given space.

	*	Furthermore, why not just use a set of very simple functions that must be satisifed to come to
		a halt.. it would be possible to simply have X number of functions that must all intersect to
		be satisifed true.. as long as the summation of the representations of the given functions does
		not exceed the length of the vector in the space where the vector describes, there is a notion
		of compression.
