/*********************************************************************
* Copyright (c) Intel Corporation 2019
* SPDX-License-Identifier: Apache-2.0
* Description: Constants
**********************************************************************/

export enum APFProtocol {
    UNKNOWN = 0,
    DISCONNECT= 1,
    SERVICE_REQUEST= 5,
    SERVICE_ACCEPT= 6,
    USERAUTH_REQUEST= 50,
    USERAUTH_FAILURE= 51,
    USERAUTH_SUCCESS= 52,
    GLOBAL_REQUEST= 80,
    REQUEST_SUCCESS= 81,
    REQUEST_FAILURE= 82,
    CHANNEL_OPEN= 90,
    CHANNEL_OPEN_CONFIRMATION= 91,
    CHANNEL_OPEN_FAILURE= 92,
    CHANNEL_WINDOW_ADJUST= 93,
    CHANNEL_DATA= 94,
    CHANNEL_CLOSE= 97,
    PROTOCOLVERSION= 192,
    KEEPALIVE_REQUEST= 208,
    KEEPALIVE_REPLY= 209,
    KEEPALIVE_OPTIONS_REQUEST= 210,
    KEEPALIVE_OPTIONS_REPLY= 211
}

export enum APFDisconnectCode{
    HOST_NOT_ALLOWED_TO_CONNECT= 1,
    PROTOCOL_ERROR= 2,
    KEY_EXCHANGE_FAILED= 3,
    RESERVED= 4,
    MAC_ERROR= 5,
    COMPRESSION_ERROR= 6,
    SERVICE_NOT_AVAILABLE= 7,
    PROTOCOL_VERSION_NOT_SUPPORTED= 8,
    HOST_KEY_NOT_VERIFIABLE= 9,
    CONNECTION_LOST= 10,
    BY_APPLICATION= 11,
    TOO_MANY_CONNECTIONS= 12,
    AUTH_CANCELLED_BY_USER= 13,
    NO_MORE_AUTH_METHODS_AVAILABLE= 14,
    INVALID_CREDENTIALS= 15,
    CONNECTION_TIMED_OUT= 16,
    BY_POLICY= 17,
    TEMPORARILY_UNAVAILABLE= 18
}

export enum APFChannelOpenFailCodes{
    ADMINISTRATIVELY_PROHIBITED= 1,
    CONNECT_FAILED= 2,
    UNKNOWN_CHANNEL_TYPE= 3,
    RESOURCE_SHORTAGE= 4,
}

export enum APFChannelOpenFailureReasonCode{
    AdministrativelyProhibited= 1,
    ConnectFailed= 2,
    UnknownChannelType= 3,
    ResourceShortage= 4,
}
