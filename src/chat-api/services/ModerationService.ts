
import env from '../../common/env';
import { RawFriend, RawUser } from '../RawData';
import { request } from './Request';
import Endpoints from './ServiceEndpoints';



export const getServers = async (limit: number, afterId?: string) => {
  const data = await request<any[]>({
    method: 'GET',
    params: {
      ...(afterId ? {after: afterId} : undefined),
      limit
    },
    url: env.SERVER_URL + "/api/moderation/servers",
    useToken: true,
  });
  return data;
};

export const getUsers = async (limit: number, afterId?: string) => {
  const data = await request<any[]>({
    method: 'GET',
    params: {
      ...(afterId ? {after: afterId} : undefined),
      limit
    },
    url: env.SERVER_URL + "/api/moderation/users",
    useToken: true,
  });
  return data;
};
export const getUsersWithSameIPAddress = async (userId: string, limit: number, afterId?: string) => {
  const data = await request<any[]>({
    method: 'GET',
    params: {
      ...(afterId ? {after: afterId} : undefined),
      limit
    },
    url: env.SERVER_URL + `/api/moderation/users/${userId}/users-with-same-ip`,
    useToken: true,
  });
  return data;
};

export const searchUsers = async (query: string, limit: number, afterId?: string) => {
  const data = await request<any[]>({
    method: 'GET',
    params: {
      q: query,
      ...(afterId ? {after: afterId} : undefined),
      limit
    },
    url: env.SERVER_URL + "/api/moderation/users/search",
    useToken: true,
  });
  return data;
};

export const deleteServer = async (serverId: string, confirmPassword: string) => {
  const data = await request<any[]>({
    method: 'DELETE',
    body: {
      password: confirmPassword
    },
    url: env.SERVER_URL + `/api/moderation/servers/${serverId}`,
    useToken: true,
  });
  return data;
}

export const suspendUsers = async (confirmPassword: string, userIds: string[], days: number, reason?: string, ipBan?: boolean) => {
  const data = await request<any[]>({
    method: 'POST',
    body: {
      userIds,
      days,
      reason,
      ipBan,
      password: confirmPassword
    },
    url: env.SERVER_URL + "/api/moderation/users/suspend",
    useToken: true,
  });
  return data;
};

export const unsuspendUsers = async (confirmPassword: string, userIds: string[]) => {
  const data = await request<any[]>({
    method: 'DELETE',
    body: {
      userIds,
      password: confirmPassword
    },
    url: env.SERVER_URL + "/api/moderation/users/suspend",
    useToken: true,
  });
  return data;
};

export const updateServer = async (serverId: string, update: {name?: string, verified?: boolean, password?: string}) => {
  const data = await request<any[]>({
    method: 'POST',
    body: update,
    url: env.SERVER_URL + `/api/moderation/servers/${serverId}`,
    useToken: true,
  });
  return data;
};

export const getServer = async (serverId: string) => {
  const data = await request<any[]>({
    method: 'GET',
    url: env.SERVER_URL + `/api/moderation/servers/${serverId}`,
    useToken: true,
  });
  return data;
};


export const getOnlineUsers = async () => {
  const data = await request<ModerationUser[]>({
    method: 'GET',
    url: env.SERVER_URL + "/api/moderation/online-users",
    useToken: true,
  });
  return data;
};


export type  ModerationUser = RawUser & {
  account: {email: string}
  suspension?: ModerationSuspension
}

export interface ModerationSuspension {
  expireAt?: number | null
  reason?: string
  suspendedAt: number
}

export const updateUser = async (userId: string, update: {email?: string, username?: string, tag?: string}) => {
  const data = await request<any[]>({
    method: 'POST',
    body: update,
    url: env.SERVER_URL + `/api/moderation/users/${userId}`,
    useToken: true,
  });
  return data;
};

export const getUser = async (userId: string) => {
  const data = await request<ModerationUser>({
    method: 'GET',
    url: env.SERVER_URL + `/api/moderation/users/${userId}`,
    useToken: true,
  });
  return data;
};

export interface ModerationStats {
  totalRegisteredUsers: number,
  weeklyRegisteredUsers: number,
  totalCreatedServers: number,
  totalCreatedMessages: number,
  weeklyCreatedMessages: number,
}

export const getStats = async () => {
  const data = await request<ModerationStats>({
    method: 'GET',
    url: env.SERVER_URL + `/api/moderation/stats`,
    useToken: true,
  });
  return data;
};
