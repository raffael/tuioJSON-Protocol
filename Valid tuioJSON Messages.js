/**
 * This file provides tuioJSON Protocol based messages that can be parsed using a tuioJSONParser JavaScript object.
 * 
 * General Notes:
 * 
 * 		(*)	All messages have to contain an id to seperate multiple gestures or handwriting events from each other.
 *
 * 		(*)	Gestures always contain coordinate information for all touches that belong to the gesture. Using this
 * 			information, the parser determines, whether all touches happen on the same element. If not, the gesture
 * 			will not trigger any event.
 * 
 * 		(*)	Gestures can contain pivot coordinate positions. This information will simply be appended to the event
 * 			by the parser. No further processing is applied to the pivot information.
 *
 * 		(*)	Gesture messages have to contain a 'gestureType' attribute. If the Gesture message contains both valid
 * 			'scale' and 'rotation' information, the 'gestureType' attribute is equal to 'gesture'.
 * 
 * 		(*)	Pen messages with penState equal to 'handwriting' can contain position information. If they don't, the
 * 			events will be triggered on 'document'
 *
 * 		(*) The Pen message with penState equal to 'handwriting' and state equal to 'processing' is optional. It
 * 			only indicates the client that handwriting processing has started and the client can wait for an
 * 			upcoming 'handwriting' message with state equal to 'result'. The 'processing' message can also
 * 			contain position information, which should be the same as the position information of the upcoming
 * 			'result' message.
 *
 */

var i = 0,
	messages	= {};

// * * *
// Touch

/**
 * A simple Touch message during a touch action
 * Requires:	a 'start' message for this id has been sent before
 * Requires:	an 'end' message for this id will be sent in the future
 * Triggers:	a 'touchmove' event
 */
messages['touchmove'] = {
	id:				i++,
	type:			'touch',
	state:			'move',
	x:				0.5,
	y:				0.5
}

// * * *
// Gesture

/**
 * A clockwise Gesture change message that contains both scale and rotation information, with optional pivot coordinate information
 * Requires:	a 'start' for this id and type has been sent before
 * Triggers:	a 'gesturechange' event
 */
messages['gesturechange'] = {
	id:				i++,
	type:			'gesture',
	gestureType:	'gesture',
	state:			'change'
	rotation:		132,
	scale:			1.4
	touches:		[{x: 0.2, y: 0.5}, {x: 0.8, y: 0.9}],
	pivotX:			0.5,
	pivotY:			0.7
}

/**
 * A scale gesture start message without pivot information
 * Requires:	-
 * Triggers:	a 'scalestart' event 
 */
messages['scalestart'] = {
	id:				i++,
	type:			'gesture',
	gestureType:	'scale',
	state:			'start',
	rotation:		0,
	touches:		[{x: 0.2, y: 0.5}, {x: 0.8, y: 0.9}]
}

/**
 * A drag change message
 * Requires:	a 'start' message for the same identifier and type has been sent before
 * Triggers:	a 'dragchange' event 
 */
messages['dragchange'] = {
	id:				i++,
	type:			'gesture',
	gestureType:	'drag',
	state:			'change',
	x:				0.5,						// the current x position
	y:				0.5,						// the current x position
	translationX:	0.04,						// the relative x movement since last drag event for this id
	translationY:	-0.001						// the relative y movement since last drag event for this id
}

// * * *
// Pen

/**
 * A simple Pen message
 * Requires:	a 'move' or 'end' message for this id will be sent in the future
 * Triggers:	a 'mousedown' event (by default)
 */
msg = {
	id:				i++,
	type:			'pen',
	state:			'start',
	x:				0.5,
	y:				0.5
}

/**
 * A notification, that handwriting processing began
 * Requires:	-
 * Triggers:	a 'handwrintingprocessing' event
 */
msg = {
	id:				i++,
	type:			'handwriting',
	state:			'processing'
}

/**
 * A handwriting result message containing the ordered results
 * Requires:	-
 * Triggers:	a 'handwritingresult' event
 */
msg = {
	id:				i++,
	type:			'handwriting',
	state:			'result',
	words:			[{word: 'hello', confidence: 0.8},{word: 'hlllo', confidence: 0.4}]
}