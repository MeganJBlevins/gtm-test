/* eslint-disable */

export default (context, inject) => {
	const gtmEvent = (category, action, label, value) => {
		if (typeof dataLayer === 'object') {
			dataLayer.push({
				event: 'genericEvent',
				eventCat: category,
				eventAction: action,
				eventLabel: label,
				eventValue: value
			});
		}
	}
	inject('gtmEvent', gtmEvent);
}

// use me in a page or component like this:
// this.$gtmEvent('hi', 'click', 'test', 1)