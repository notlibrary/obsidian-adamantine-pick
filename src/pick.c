/*
	Adamantine Pick wrapper. Used to pass pointer from javascript to
	C manually to get in SVG width and height and avoid C++ node.js NAPI on client entirely   
		
	Now from main.ts you can do:
	const factory = require("./pick.js");
	factory().then((instance) => {
		let pikchr = instance.cwrap('pick', 'string', ['string','string','number']);
		let pick_width = instance.cwrap('pick_height', 'number', ['number']);
		let pick_height = instance.cwrap('pick_width', 'number', ['number']);
	}
	Because passing pointers from js to C is complicated 
	it passes pointer to inner static variable to pikchr
	and cwrap method to get/set it from javascript/typescript
	[typescript/javascript method] <-[ pick ]-> [pointer pikchr]
	
*/

#include "pikchr.c"
#define PICK_CALL
#define PICK_MAGIC_DIMENSION 128
#define PICK_TRANSLATION_UNIT_ID "pick.js"

PICK_CALL int 
pick_height(int** pick_height)
{
	static int height = PICK_MAGIC_DIMENSION;
	static int* height_p = &height;
	
	if ((pick_height !=NULL) || (pick_height !=0)) {
		height_p=&height;
		*pick_height = height_p; 
	}
		
	return height;
	
}

PICK_CALL int 
pick_width(int** pick_width)
{
	static int width = PICK_MAGIC_DIMENSION;
	static int* width_p = &width;
	
	
	if ((pick_width !=NULL) || (pick_width !=0)) {
		width_p = &width;
		*pick_width = width_p; 
	}
		
	return width;
	
}

PICK_CALL char* 
pick(const char *zText, const char *zClass, unsigned int mFlags)
{
	int* pickHeight = NULL;
	int* pickWidth = NULL;
	
	pick_height(&pickHeight);
	pick_width(&pickWidth);
	
	return pikchr(zText, zClass, mFlags, pickWidth, pickHeight );
}
#undef PICK_CALL
#undef PICK_TRANSLATION_UNIT_ID