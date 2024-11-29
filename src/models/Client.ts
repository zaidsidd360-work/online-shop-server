import mongoose, { Document, Schema } from "mongoose";

export interface IItem {
	id: number;
	name: string;
	price: number;
	brand: string;
	size: string;
	imageUrl: string;
}

export interface IClient extends Document {
	name: string;
	email: string;
	phone?: string;
	address?: string;
	brands: string[];
	sizes: string[];
	items: IItem[];
	createdAt: Date;
	updatedAt: Date;
}

const ClientSchema = new Schema<IClient>(
	{
		name: {
			type: String,
			required: [true, "Client name is required"],
			trim: true,
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			trim: true,
			lowercase: true,
			match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
		},
		phone: {
			type: String,
			trim: true,
		},
		address: {
			type: String,
			trim: true,
		},
		brands: {
			type: [String],
			required: true,
			default: [],
		},
		sizes: {
			type: [String],
			required: true,
			default: [],
		},
		items: {
			type: [
				{
					id: {
						type: Number,
						required: true,
					},
					name: {
						type: String,
						required: true,
						trim: true,
					},
					price: {
						type: Number,
						required: true,
						min: 0,
					},
					brand: {
						type: String,
						required: true,
						trim: true,
					},
					size: {
						type: String,
						required: true,
						trim: true,
					},
					imageUrl: {
						type: String,
						required: true,
						trim: true,
					},
				},
			],
			required: true,
			default: [],
		},
	},
	{
		timestamps: true,
	}
);

// Indexes for better query performance
ClientSchema.index({ email: 1 });
ClientSchema.index({ "items.brand": 1 });
ClientSchema.index({ "items.size": 1 });

// Middleware to ensure brands and sizes arrays are derived from items
ClientSchema.pre("save", function (next) {
	const uniqueBrands = new Set(this.items.map((item) => item.brand));
	const uniqueSizes = new Set(this.items.map((item) => item.size));

	this.brands = Array.from(uniqueBrands);
	this.sizes = Array.from(uniqueSizes);

	next();
});

const Client = mongoose.model<IClient>("Client", ClientSchema);
export default Client;
