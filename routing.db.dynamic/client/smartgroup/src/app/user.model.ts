export class User {
	public name: string;
	public role: string;

	constructor(name: string = 'anonymous', role: string = 'none') {
		this.name = name;
		this.role = role;
	}
}