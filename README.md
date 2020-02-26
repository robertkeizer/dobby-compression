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
