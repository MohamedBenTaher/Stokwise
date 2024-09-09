/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface FileDto {
	id: string;
}

export interface RoleDto {
	id: number;
}

export interface StatusDto {
	id: number;
}

export interface CreateUserDto {
	/** @example "test1@example.com" */
	email: object;
	password: string;
	/** @example "John" */
	firstName: object;
	/** @example "Doe" */
	lastName: object;
	photo?: FileDto;
	role?: RoleDto;
	status?: StatusDto;
}

export interface UpdateUserDto {
	/** @example "test1@example.com" */
	email?: object;
	password?: string;
	/** @example "John" */
	firstName?: object;
	/** @example "Doe" */
	lastName?: object;
	photo?: FileDto;
	role?: RoleDto;
	status?: StatusDto;
}

export interface AuthEmailLoginDto {
	/** @example "test1@example.com" */
	email: string;
	password: string;
}

export interface AuthRegisterLoginDto {
	/** @example "test1@example.com" */
	email: string;
	password: string;
	/** @example "John" */
	firstName: string;
	/** @example "Doe" */
	lastName: string;
}

export interface AuthConfirmEmailDto {
	hash: string;
}

export interface AuthForgotPasswordDto {
	email: string;
}

export interface AuthResetPasswordDto {
	password: string;
	hash: string;
}

export interface AuthUpdateDto {
	photo?: FileDto;
	/** @example "John" */
	firstName?: string;
	/** @example "Doe" */
	lastName?: string;
	password?: string;
	oldPassword?: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from 'axios';
import axiosInstance from './api/axios';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
	/** set parameter to `true` for call `securityWorker` for this request */
	secure?: boolean;
	/** request path */
	path: string;
	/** content type of request body */
	type?: ContentType;
	/** query params */
	query?: QueryParamsType;
	/** format of response (i.e. response.json() -> format: "json") */
	format?: ResponseType;
	/** request body */
	body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
	securityWorker?: (
		securityData: SecurityDataType | null,
	) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
	secure?: boolean;
	format?: ResponseType;
}

export enum ContentType {
	Json = 'application/json',
	FormData = 'multipart/form-data',
	UrlEncoded = 'application/x-www-form-urlencoded',
	Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
	public instance: AxiosInstance;
	private securityData: SecurityDataType | null = null;
	private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
	private secure?: boolean;
	private format?: ResponseType;

	constructor({ securityWorker, secure, format }: ApiConfig<SecurityDataType> = {}) {
		this.instance = axiosInstance;
		this.secure = secure;
		this.format = format;
		this.securityWorker = securityWorker;
	}

	public setSecurityData = (data: SecurityDataType | null) => {
		this.securityData = data;
	};

	protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
		const method = params1.method || (params2 && params2.method);

		return {
			...this.instance.defaults,
			...params1,
			...(params2 || {}),
			headers: {
				...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
				...(params1.headers || {}),
				...((params2 && params2.headers) || {}),
			},
		};
	}

	protected stringifyFormItem(formItem: unknown) {
		if (typeof formItem === 'object' && formItem !== null) {
			return JSON.stringify(formItem);
		} else {
			return `${formItem}`;
		}
	}

	protected createFormData(input: Record<string, unknown>): FormData {
		return Object.keys(input || {}).reduce((formData, key) => {
			const property = input[key];
			const propertyContent: any[] = property instanceof Array ? property : [property];

			for (const formItem of propertyContent) {
				const isFileType = formItem instanceof Blob || formItem instanceof File;
				formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
			}

			return formData;
		}, new FormData());
	}

	public request = async <T = any, _E = any>({
		secure,
		path,
		type,
		query,
		format,
		body,
		...params
	}: FullRequestParams): Promise<AxiosResponse<T>> => {
		const secureParams =
			((typeof secure === 'boolean' ? secure : this.secure) &&
				this.securityWorker &&
				(await this.securityWorker(this.securityData))) ||
			{};
		const requestParams = this.mergeRequestParams(params, secureParams);
		const responseFormat = format || this.format || undefined;

		if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
			body = this.createFormData(body as Record<string, unknown>);
		}

		if (type === ContentType.Text && body && body !== null && typeof body !== 'string') {
			body = JSON.stringify(body);
		}

		return this.instance.request({
			...requestParams,
			headers: {
				...(requestParams.headers || {}),
				...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
			},
			params: query,
			responseType: responseFormat,
			data: body,
			url: path,
		});
	};
}

/**
 * @title Stockwise API
 * @version 1.0
 * @contact
 *
 * The Stockwise API description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
	/**
	 * No description
	 *
	 * @name AppControllerGetHello
	 * @request GET:/
	 */
	appControllerGetHello = (params: RequestParams = {}) =>
		this.request<void, any>({
			path: `/`,
			method: 'GET',
			...params,
		});

	marketNews = {
		/**
		 * No description
		 *
		 * @tags market-news
		 * @name MarketNewsControllerGetMarketNews
		 * @summary Get daily market news
		 * @request GET:/market-news
		 */
		marketNewsControllerGetMarketNews: (params: RequestParams = {}) =>
			this.request<void, void>({
				path: `/market-news`,
				method: 'GET',
				...params,
			}),
	};
	users = {
		/**
		 * No description
		 *
		 * @tags Users
		 * @name UsersControllerCreate
		 * @request POST:/users
		 * @secure
		 */
		usersControllerCreate: (data: CreateUserDto, params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/users`,
				method: 'POST',
				body: data,
				secure: true,
				type: ContentType.Json,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Users
		 * @name UsersControllerFindAll
		 * @request GET:/users
		 * @secure
		 */
		usersControllerFindAll: (
			query?: {
				page?: number;
				limit?: number;
				filters?: string;
				sort?: string;
			},
			params: RequestParams = {},
		) =>
			this.request<void, any>({
				path: `/users`,
				method: 'GET',
				query: query,
				secure: true,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Users
		 * @name UsersControllerFindOne
		 * @request GET:/users/{id}
		 * @secure
		 */
		usersControllerFindOne: (id: string, params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/users/${id}`,
				method: 'GET',
				secure: true,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Users
		 * @name UsersControllerUpdate
		 * @request PATCH:/users/{id}
		 * @secure
		 */
		usersControllerUpdate: (id: string, data: UpdateUserDto, params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/users/${id}`,
				method: 'PATCH',
				body: data,
				secure: true,
				type: ContentType.Json,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Users
		 * @name UsersControllerRemove
		 * @request DELETE:/users/{id}
		 * @secure
		 */
		usersControllerRemove: (id: string, params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/users/${id}`,
				method: 'DELETE',
				secure: true,
				...params,
			}),
	};
	files = {
		/**
		 * No description
		 *
		 * @tags Files
		 * @name FilesLocalControllerUploadFile
		 * @request POST:/files/upload
		 * @secure
		 */
		filesLocalControllerUploadFile: (
			data: {
				/** @format binary */
				file?: File;
			},
			params: RequestParams = {},
		) =>
			this.request<void, any>({
				path: `/files/upload`,
				method: 'POST',
				body: data,
				secure: true,
				type: ContentType.FormData,
				...params,
			}),
	};
	auth = {
		/**
		 * No description
		 *
		 * @tags Auth
		 * @name AuthControllerLogin
		 * @request POST:/auth/email/login
		 */
		authControllerLogin: (data: AuthEmailLoginDto, params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/auth/email/login`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Auth
		 * @name AuthControllerRegister
		 * @request POST:/auth/email/register
		 */
		authControllerRegister: (data: AuthRegisterLoginDto, params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/auth/email/register`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Auth
		 * @name AuthControllerConfirmEmail
		 * @request POST:/auth/email/confirm
		 */
		authControllerConfirmEmail: (data: AuthConfirmEmailDto, params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/auth/email/confirm`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Auth
		 * @name AuthControllerForgotPassword
		 * @request POST:/auth/forgot/password
		 */
		authControllerForgotPassword: (data: AuthForgotPasswordDto, params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/auth/forgot/password`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Auth
		 * @name AuthControllerResetPassword
		 * @request POST:/auth/reset/password
		 */
		authControllerResetPassword: (data: AuthResetPasswordDto, params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/auth/reset/password`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Auth
		 * @name AuthControllerMe
		 * @request GET:/auth/me
		 * @secure
		 */
		authControllerMe: (params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/auth/me`,
				method: 'GET',
				secure: true,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Auth
		 * @name AuthControllerUpdate
		 * @request PATCH:/auth/me
		 * @secure
		 */
		authControllerUpdate: (data: AuthUpdateDto, params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/auth/me`,
				method: 'PATCH',
				body: data,
				secure: true,
				type: ContentType.Json,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Auth
		 * @name AuthControllerDelete
		 * @request DELETE:/auth/me
		 * @secure
		 */
		authControllerDelete: (params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/auth/me`,
				method: 'DELETE',
				secure: true,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Auth
		 * @name AuthControllerRefresh
		 * @request POST:/auth/refresh
		 * @secure
		 */
		authControllerRefresh: (params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/auth/refresh`,
				method: 'POST',
				secure: true,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Auth
		 * @name AuthControllerLogout
		 * @request POST:/auth/logout
		 * @secure
		 */
		authControllerLogout: (params: RequestParams = {}) =>
			this.request<void, any>({
				path: `/auth/logout`,
				method: 'POST',
				secure: true,
				...params,
			}),
	};
}
