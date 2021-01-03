 interface inputValues {
	input: number[];
	target: number;
}

interface Result {
	periodLength:		number;
	trainingDays:		number;
	success:		boolean;
	rating:			number;
	ratingDescription:	string;
	target:			number;
	average:		number
}

const parseArguments = (args: Array<string>): inputValues => {
	if (args.length < 4) throw new Error('Not enough arguments');

	for (let i = 2; i < args.length; i++)
	{
		if (isNaN(Number(args[i])))
			throw new Error('Provided values were not numbers!');
	}

	return {	target: Number(args[2]),
			input:  args.slice(3).map(a => Number(a))
	};
};

const getRating = (average: number, target: number): number => {
	if (average >= target)			return 3;
	else if (average > target / 1.1)	return 2;
	else					return 1;
};

const getRatingString = (average: number): string => {
	switch(average){
		case 3: 	return "Good job";
		case 2: 	return "not too bad but could be better";
		default:	return "Bad job";
	}
};

export const calculateExercises = (input: number[], target: number): Result => {
console.log("args", input);
	const average		= Number(input.reduce((accumulator: number, currentValue: number) => { return accumulator + currentValue; }, 0))/input.length;
	const trainingDays	= input.filter(a => a !== 0).length;
	const periodLength	= input.length;
	const success		= (average >= target);
	const rating		= getRating(average, target);
	const ratingDescription	= getRatingString(rating);

	const returnValue = {	
						periodLength,
						trainingDays,
						success,
						rating,
					ratingDescription,
					target,
						average,
	};
	return returnValue;
};
 
try {
	const { input, target } = parseArguments(process.argv);
	console.log(calculateExercises(input, target));
} catch (e) {
	//eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	console.log('Error, something bad happened, message: ', e.message);
}