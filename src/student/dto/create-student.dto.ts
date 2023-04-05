export class CreateStudentDto {
    first_name: string;
    last_name: string;
    email?: string;
    otp: string;
    check: string;
    varification_key: string;
}
