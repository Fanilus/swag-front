export const generateUEID = () => {
	let first = (Math.random() * 46656) | 0;
	let second = (Math.random() * 46656) | 0;
	first = ('000' + first.toString(36)).slice(-3);
	second = ('000' + second.toString(36)).slice(-3);

	return first + second;
};

export const numberToDollars = (float, splitter = ',', decimals = 0) => {
	try {
		float = parseFloat(float);

		return formatter
			.format(
				float.toFixed(decimals).toString() === '-0'
					? 0
					: float.toFixed(decimals),
			)
			.replaceAll(',', splitter);
	} catch (e) {
		return '-';
	}
};

export const spliceAddress = (address) => {
	return address
		? address.substring(0, 5) +
				'..' +
				address.substring(address.length - 4, address.length)
		: '';
};

export const shortName = (name, symbols = 26) => {
	return name && name.length > symbols
		? name.substring(0, symbols) + '...'
		: name;
};

export const copyToClipboard = (data) => {
	return navigator.clipboard.writeText(data);
};

export const convertToGoodAddress = (address) => {
	return address.startsWith('0x') ? address : `0x${address}`;
};

export const getAppNameByAddress = (address, apps) => {
	const app = apps.find((app) => convertToGoodAddress(app.app) === address);
	return app ? app.name : spliceAddress(address);
};

export const hexToRgb = (hex) => {
	const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
	const result = regex.exec(hex);
	return {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16),
	};
};

export const rgbToHex = ({ r, g, b }) => {
	return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

export const calculateMidpointValue = (start, end, n, max) => {
	return Math.round(start + (n * (end - start)) / max);
};

// 22 Sept 2021, 6:06
export const formatDate = (date) => {
	const monthNames = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];

	const year = date.getFullYear();
	const month = monthNames[date.getMonth()];
	const day = date.getDate();
	const min =
		date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
	const hour = date.getHours();

	return `${day} ${month} ${year}, ${hour}:${min}`;
};

export const percentDifference = (a, b) => {
	if (!(Number(a) - Number(b))) return 0;
	return (((Number(a) - Number(b)) / Number(b)) * 100).toFixed(2);
};

export const numberWithCommas = (x) => {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const numberWithSplitter = (x, splitter) => {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, splitter);
};

export const toCurrency = (amount, currency = '$', target = 'k') => {
	if (Number(amount)) {
		switch (target.toLowerCase()) {
			case 'k':
				return `${currency} ${(parseFloat(amount) / 1000).toFixed(0)}k`;
			case 'm':
				return `${currency} ${(parseFloat(amount) / 1000000).toFixed(
					1,
				)}M`;
			default:
				return `${currency} ${(parseFloat(amount) / 1000).toFixed(0)}k`;
		}
	} else {
		switch (target.toLowerCase()) {
			case 'k':
				return `${currency} 0k`;
			case 'm':
				return `${currency} 0M`;
			default:
				return `${currency} 0k`;
		}
	}
};

export const toPercent = (amount, decimals = 0) => {
	try {
		const nAmount = Number(amount);

		if (nAmount % 1) {
			return `${
				Math.round(nAmount * Math.pow(10, decimals)) /
				Math.pow(10, decimals)
			}%`;
		}

		return `${nAmount}%`;
	} catch (e) {
		return '-';
	}
};

export const toRound = (amount, decim = 1) => {
	if (Number(amount)) {
		if (Number(amount) % 1)
			return parseFloat(Number(amount).toFixed(decim));
		return Number(amount);
	} else {
		return 0;
	}
};

/* eslint-disable no-useless-escape */
export const isMobile = function () {
	let isMobile = false;
	(function (a) {
		if (
			/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
				a,
			) ||
			/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
				a.substr(0, 4),
			)
		)
			isMobile = true;
	})(navigator.userAgent || navigator.vendor || window.opera);
	return isMobile;
};

export const getHistoricData = (arr, key, len = 7) => {
	const dots = [];
	const step = arr.length / (len - 1);

	for (let i = 0; i < len; i++) {
		const index =
			Math.floor(i * step) >= arr.length
				? arr.length - 1
				: Math.floor(i * step);
		dots.push({ x: arr[index].dt, y: parseFloat(arr[index][key]) });
	}

	dots.sort((a, b) => {
		return new Date(a.x) - new Date(b.x);
	});

	return dots;
};

export const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 0,
});

export const formatTimeFoProxyBotCreateDAO = function (days, hours, minutes) {
	return (
		Number(minutes) * 60 +
		Number(hours) * 60 * 60 +
		Number(days) * 24 * 60 * 60
	);
};

export const generateMidpointColors = (midpoints, startColor, endColor) => {
	const { r: startR, g: startG, b: startB } = hexToRgb(startColor);
	const { r: endR, g: endG, b: endB } = hexToRgb(endColor);

	return Array.apply(null, Array(midpoints))
		.map((_, index) => ({
			r: calculateMidpointValue(startR, endR, index + 1, midpoints + 1),
			g: calculateMidpointValue(startG, endG, index + 1, midpoints + 1),
			b: calculateMidpointValue(startB, endB, index + 1, midpoints + 1),
		}))
		.map(rgbToHex);
};
