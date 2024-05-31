export default class UserModel {
	public id: number;
	public name: string;
	public email: string;
	public password: string;
	public created_at: Date;
	public updated_at: Date;
	public deleted_at: Date;
	public constructor(
		id: number,
		name: string,
		email: string,
		password: string,
		created_at: Date,
		updated_at: Date,
		deleted_at: Date,
	) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.created_at = created_at;
		this.updated_at = updated_at;
		this.deleted_at = deleted_at;
	}
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	public static fromJson(json: any): UserModel {
		return new UserModel(
			json.id,
			json.name,
			json.email,
			json.password,
			json.created_at,
			json.updated_at,
			json.deleted_at,
		);
	}
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	public toJson(): any {
		return {
			id: this.id,
			name: this.name,
			email: this.email,
			password: this.password,
			created_at: this.created_at,
			updated_at: this.updated_at,
			deleted_at: this.deleted_at,
		};
	}
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	public static fromJsonArray(json: any[]): UserModel[] {
		return json.map((item) => UserModel.fromJson(item));
	}
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	public static toJsonArray(model: UserModel[]): any[] {
		return model.map((item) => item.toJson());
	}
}
