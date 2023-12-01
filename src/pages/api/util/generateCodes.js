export default function generateUniqueCode() {
	const usedCodes = new Set();

	while (true) {
		const newCode = Math.floor(10000 + Math.random() * 90000); // Generate a random 5-digit number
		if (!usedCodes.has(newCode)) {
			usedCodes.add(newCode);
			return newCode.toString();
		}
	}
}
