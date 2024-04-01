using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mng.Data.Migrations
{
    /// <inheritdoc />
    public partial class _5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeesRoles_Employees_EmployeeId",
                table: "EmployeesRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_EmployeesRoles_Roles_RoleId",
                table: "EmployeesRoles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EmployeesRoles",
                table: "EmployeesRoles");

            migrationBuilder.RenameTable(
                name: "EmployeesRoles",
                newName: "EmployeeRole");

            migrationBuilder.RenameIndex(
                name: "IX_EmployeesRoles_RoleId",
                table: "EmployeeRole",
                newName: "IX_EmployeeRole_RoleId");

            migrationBuilder.RenameIndex(
                name: "IX_EmployeesRoles_EmployeeId",
                table: "EmployeeRole",
                newName: "IX_EmployeeRole_EmployeeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EmployeeRole",
                table: "EmployeeRole",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeRole_Employees_EmployeeId",
                table: "EmployeeRole",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeRole_Roles_RoleId",
                table: "EmployeeRole",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeRole_Employees_EmployeeId",
                table: "EmployeeRole");

            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeRole_Roles_RoleId",
                table: "EmployeeRole");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EmployeeRole",
                table: "EmployeeRole");

            migrationBuilder.RenameTable(
                name: "EmployeeRole",
                newName: "EmployeesRoles");

            migrationBuilder.RenameIndex(
                name: "IX_EmployeeRole_RoleId",
                table: "EmployeesRoles",
                newName: "IX_EmployeesRoles_RoleId");

            migrationBuilder.RenameIndex(
                name: "IX_EmployeeRole_EmployeeId",
                table: "EmployeesRoles",
                newName: "IX_EmployeesRoles_EmployeeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EmployeesRoles",
                table: "EmployeesRoles",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeesRoles_Employees_EmployeeId",
                table: "EmployeesRoles",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeesRoles_Roles_RoleId",
                table: "EmployeesRoles",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
