# Security Specification - ServiceFlow CRM

## Data Invariants
- A client record MUST belong to a valid user (ownerId).
- Only the owner of a client record can read, update, or delete it.
- Clients cannot be created with a fake ownerId (must match request.auth.uid).
- Status must be one of: 'Paid', 'Pending', 'Overdue'.
- Monthly amount must be a non-negative number.
- Timestamps (createdAt, updatedAt) must be valid server timestamps.

## The "Dirty Dozen" Payloads (PERMISSION_DENIED expected)

1. **Identity Spoofing**: Create a client with `ownerId` of another user.
2. **Shadow Field injection**: Create a client with an undocumented field `isPremium: true`.
3. **Empty Name**: Create a client with an empty name.
4. **Invalid Status**: Update a client with `status: 'Cancelled'`.
5. **Negative Amount**: Create/Update a client with `monthlyAmount: -100`.
6. **Fake Server Timestamp**: Create a client with a hand-written date for `createdAt` instead of `request.time`.
7. **Cross-User Read**: Try to `get` a client record belonging to another user.
8. **Malicious ID**: Create a client with a very long/junk document ID.
9. **Unverified Email Access**: Attempt to write if the user's email is not verified (if mandated).
10. **Immutable Field Change**: Try to update `createdAt` after creation.
11. **Huge Data Injection**: Try to inject a 1MB string into the `notes` field.
12. **Owner Hijack**: Update an existing client to change its `ownerId` to the attacker's UID.

## Test Cases
- [ ] Deny creation if `ownerId` != `request.auth.uid`.
- [ ] Deny creation if required fields are missing.
- [ ] Deny update if `affectedKeys` includes `ownerId` or `createdAt`.
- [ ] Deny read if `resource.data.ownerId` != `request.auth.uid`.
- [ ] Deny write if `request.auth.token.email_verified` is false (standard security policy).
