CREATE TABLE [dbo].[EmployeeRole] (
    [Id]               INT           IDENTITY (1, 1) NOT NULL,
    [RoleId]           INT           NOT NULL,
    [EnterDate]        DATETIME2 (7) NOT NULL,
    [EmployeeId]       INT           NULL,
    [IsAdministrative] BIT           DEFAULT (CONVERT([bit],(0))) NOT NULL,
    CONSTRAINT [PK_EmployeeRole] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_EmployeeRole_Employees_EmployeeId] FOREIGN KEY ([EmployeeId]) REFERENCES [dbo].[Employees] ([Id]),
    CONSTRAINT [FK_EmployeeRole_Roles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [dbo].[Roles] ([Id]) ON DELETE CASCADE
);


GO
CREATE NONCLUSTERED INDEX [IX_EmployeeRole_EmployeeId]
    ON [dbo].[EmployeeRole]([EmployeeId] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_EmployeeRole_RoleId]
    ON [dbo].[EmployeeRole]([RoleId] ASC);

GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_EmployeeRole_EmployeeId_RoleId] 
    ON [dbo].[EmployeeRole] ([EmployeeId], [RoleId]);