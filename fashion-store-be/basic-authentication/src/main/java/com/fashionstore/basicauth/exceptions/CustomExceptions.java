package com.fashionstore.basicauth.exceptions;

public enum CustomExceptions {

	USER_ALREADY_REGISTERED(1234L, "User already registered", UserAlreadyRegistered.class);

	private Long errorCode;
	private String description;
	private Class<? extends Throwable> classType;

	private CustomExceptions(Long errorCode, String description, Class<? extends Throwable> classType) {
		this.errorCode = errorCode;
		this.description = description;
		this.classType = classType;
	}

	public Long getErrorCode() {
		return this.errorCode;
	}

	public String getDescription() {
		return this.description;
	}

	public Class<? extends Throwable> getExceptionType() {
		return this.classType;
	}
	
	public String toString() {
		return "{ errorCode : " + errorCode + ", description : " + description + " }";
	}

}
