import { baseApi } from "../../services/baseApi";

const unwrap = (response) => response?.data ?? response;

export const auditApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAudit: builder.mutation({
      query: (body) => ({ url: "/audits", method: "POST", body }),
      transformResponse: unwrap,
      invalidatesTags: [{ type: "AuditList", id: "LIST" }],
    }),
    getAudit: builder.query({
      query: (id) => `/audits/${id}`,
      transformResponse: unwrap,
      providesTags: (_result, _err, id) => [{ type: "Audit", id }],
    }),
    listAudits: builder.query({
      query: (params = {}) => {
        const search = new URLSearchParams();
        Object.entries(params).forEach(([k, v]) => {
          if (v !== undefined && v !== null && v !== "") search.set(k, v);
        });
        const qs = search.toString();
        return `/audits${qs ? `?${qs}` : ""}`;
      },
      transformResponse: unwrap,
      providesTags: (result) =>
        result?.items
          ? [
              ...result.items.map((a) => ({ type: "Audit", id: a.id })),
              { type: "AuditList", id: "LIST" },
            ]
          : [{ type: "AuditList", id: "LIST" }],
    }),
    deleteAudit: builder.mutation({
      query: (id) => ({ url: `/audits/${id}`, method: "DELETE" }),
      invalidatesTags: (_r, _e, id) => [
        { type: "Audit", id },
        { type: "AuditList", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useCreateAuditMutation,
  useGetAuditQuery,
  useListAuditsQuery,
  useDeleteAuditMutation,
} = auditApi;
