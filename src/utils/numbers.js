import { isNaN, forEach } from 'lodash';



const config = [
    { divisor: '1e24', scale: 8, unit: 'Y' }, // septillion: YOTTA
    { divisor: '1e21', scale: 7, unit: 'Z' }, // sextillion: ZETTA
    { divisor: '1e18', scale: 6, unit: 'E' }, // quintillion: EXA
    { divisor: '1e15', scale: 5, unit: 'P' }, // quadrillion: PETA
    { divisor: '1e12', scale: 4, unit: 'T' }, // trillion: TERA
    { divisor: '1e9', scale: 3, unit: 'G' }, // billion: GIGA
    { divisor: '1e6', scale: 2, unit: 'M' }, // million: MEGA
    { divisor: '1e3', scale: 1, unit: 'K' }, // thousand: KILO
    { divisor: 1, scale: 1, unit: '' }, // one
];

export const roundFloatPoint = (value, scale) => Number(`${Math.round(`${value}e${scale}`)}e-${scale}`);

export const formatNum = (number) => {
    const result = parseFloat(number);
    if (isNaN(result)) return '';
    if (Number(result) === 0) return '-';

    const negativeSign = result < 0 ? '-' : '';
    const abs = result;

    let breakLoop = false;
    let value = abs;
    forEach(config, (elt) => {
        const quotient = abs / Number(elt.divisor);
        if (quotient >= 1 && !breakLoop) {
            value = `${negativeSign}${roundFloatPoint(quotient, elt.scale)}${elt.unit}`;
            breakLoop = true;
        }
    });
    return value;
};
