import { formatDate, formatPrice } from "@/utils/helpers"

export const RentalContract = ({
    roomBlockAddress,
    AFullName,
    ABirthDay,
    AIdentifyNo,
    AIdentifyDate,
    AIdentifyAddress,
    APhoneNumber,
    BFullName,
    BBirthDay,
    BIdentifyNo,
    BIdentifyDate,
    BIdentifyAddress,
    BPhoneNumber,
    roomPrice,
    electricPrice,
    waterPrice,
    depositAmount,
    moveInDate,
    moveOutDate,
    ASignature,
    BSignature
}: any) => {
    return (
        <div className="mx-auto w-5/6 text-2xl leading-normal">
            <br />
            <p className="text-center font-medium">CỘNG H&Ograve;A X&Atilde; HỘI CHỦ NGHĨA VIỆT NAM</p>
            <p className="text-center font-medium">Độc lập &ndash; Tự do &ndash; Hạnh ph&uacute;c</p>
            <p className="text-center">
                <br />
            </p>
            <p className="text-center">
                <strong>HỢP ĐỒNG THU&Ecirc; PH&Ograve;NG TRỌ</strong>
            </p>
            <p>
                <br />
            </p>
            <p>
                Ng&agrave;y ................. th&aacute;ng ................ năm .................. tại địa chỉ:{" "}
                {roomBlockAddress}.
            </p>
            <p>Ch&uacute;ng t&ocirc;i gồm:</p>
            <p className="font-medium">1. Đại diện b&ecirc;n cho thu&ecirc; ph&ograve;ng trọ (B&ecirc;n A):</p>
            <p>
                &Ocirc;ng/b&agrave;: {AFullName} <span className="ml-20" /> Sinh ng&agrave;y: {formatDate(ABirthDay)}
            </p>
            <p>Nơi đăng k&yacute; HK thường tr&uacute;:</p>
            <p>
                CMND: {AIdentifyNo} <span className="ml-20" /> Ng&agrave;y cấp: {formatDate(AIdentifyDate)}{" "}
                <span className="ml-20" /> Nơi cấp: {AIdentifyAddress}
            </p>
            <p>Số điện thoại: {APhoneNumber}</p>
            <p className="font-medium">2. B&ecirc;n thu&ecirc; ph&ograve;ng trọ (B&ecirc;n B):</p>
            <p>
                &Ocirc;ng/b&agrave;: {BFullName} <span className="ml-20" /> Sinh ng&agrave;y: {formatDate(BBirthDay)}
            </p>
            <p>Nơi đăng k&yacute; HK thường tr&uacute;:</p>
            <p>
                Số CMND: {BIdentifyNo} <span className="ml-20" /> Ng&agrave;y cấp {formatDate(BIdentifyDate)}{" "}
                <span className="ml-20" /> Nơi cấp: {BIdentifyAddress}
            </p>
            <p>Số điện thoại: {BPhoneNumber}</p>
            <br />
            <p className="font-medium">
                Sau khi b&agrave;n bạc tr&ecirc;n tinh thần d&acirc;n chủ, hai b&ecirc;n c&ugrave;ng c&oacute; lợi,
                c&ugrave;ng thống nhất như sau:
            </p>
            <p>
                - B&ecirc;n A đồng &yacute; cho b&ecirc;n B thu&ecirc; 01 ph&ograve;ng ở tại địa chỉ: {roomBlockAddress}
                .
            </p>
            <p>- Gi&aacute; thu&ecirc;: {formatPrice(roomPrice)}/th&aacute;ng</p>
            <p>
                - H&igrave;nh thức thanh to&aacute;n: Tiền mặt hoặc chuyển khoản (thanh to&aacute;n v&agrave;o đầu
                c&aacute;c th&aacute;ng).
            </p>
            <p>- Tiền điện: {formatPrice(electricPrice)}/kwh t&iacute;nh theo chỉ số c&ocirc;ng tơ.</p>
            <p>- Tiền nước: {formatPrice(waterPrice)}/m3.</p>
            <p>- Tiền đặt cọc: {formatPrice(depositAmount)}.</p>
            <p>
                * Hợp đồng c&oacute; gi&aacute; trị kể từ {formatDate(moveInDate)} đến {formatDate(moveOutDate)}.
            </p>
            <p>
                <br />
            </p>
            <p>
                <strong>TR&Aacute;CH NHIỆM CỦA C&Aacute;C B&Ecirc;N</strong>
            </p>
            <p>
                <strong>* Tr&aacute;ch nhiệm của b&ecirc;n A:</strong>
            </p>
            <p>- Tạo mọi điều kiện thuận lợi để b&ecirc;n B thực hiện theo hợp đồng.</p>
            <p>- Cung cấp nguồn điện, nước, wifi cho b&ecirc;n B sử dụng.</p>
            <p>
                <strong>* Tr&aacute;ch nhiệm của b&ecirc;n B:</strong>
            </p>
            <p>- Thanh to&aacute;n đầy đủ c&aacute;c khoản tiền theo đ&uacute;ng thỏa thuận.</p>
            <p>
                - Bảo quản c&aacute;c trang thiết bị v&agrave; cơ sở vật chất của b&ecirc;n A trang bị cho ban đầu
                (l&agrave;m hỏng phải sửa, mất phải đền).
            </p>
            <p>
                - Kh&ocirc;ng được tự &yacute; sửa chữa, cải tạo cơ sở vật chất khi chưa được sự đồng &yacute; của
                b&ecirc;n A.
            </p>
            <p>- Giữ g&igrave;n vệ sinh trong v&agrave; ngo&agrave;i khu&ocirc;n vi&ecirc;n của ph&ograve;ng trọ.</p>
            <p>
                - B&ecirc;n B phải chấp h&agrave;nh mọi quy định của ph&aacute;p luật Nh&agrave; nước v&agrave; quy định
                của địa phương.
            </p>
            <p>
                - Nếu b&ecirc;n B cho kh&aacute;ch ở qua đ&ecirc;m th&igrave; phải b&aacute;o v&agrave; được sự đồng
                &yacute; của chủ nh&agrave; đồng thời phải chịu tr&aacute;ch nhiệm về c&aacute;c h&agrave;nh vi vi phạm
                ph&aacute;p luật của kh&aacute;ch trong thời gian ở lại.
            </p>
            <p>
                <br />
            </p>
            <p>
                <strong>TR&Aacute;CH NHIỆM CHUNG</strong>
            </p>
            <p>- Hai b&ecirc;n phải tạo điều kiện cho nhau thực hiện hợp đồng.</p>
            <p>
                - Trong thời gian hợp đồng c&ograve;n hiệu lực nếu b&ecirc;n n&agrave;o vi phạm c&aacute;c điều khoản
                đ&atilde; thỏa thuận th&igrave; b&ecirc;n c&ograve;n lại c&oacute; quyền đơn phương chấm dứt hợp đồng;
                nếu sự vi phạm hợp đồng đ&oacute; g&acirc;y tổn thất cho b&ecirc;n bị vi phạm hợp đồng th&igrave;
                b&ecirc;n vi phạm hợp đồng phải bồi thường thiệt hại.
            </p>
            <p>
                - Một trong hai b&ecirc;n muốn chấm dứt hợp đồng trước thời hạn th&igrave; phải b&aacute;o trước cho
                b&ecirc;n kia &iacute;t nhất 30 ng&agrave;y v&agrave; hai b&ecirc;n phải c&oacute; sự thống nhất.
            </p>
            <p>- B&ecirc;n A phải trả lại tiền đặt cọc cho b&ecirc;n B.</p>
            <p>
                - B&ecirc;n n&agrave;o vi phạm điều khoản chung th&igrave; phải chịu tr&aacute;ch nhiệm trước
                ph&aacute;p luật.
            </p>
            - Hợp đồng được lập th&agrave;nh 02 bản c&oacute; gi&aacute; trị ph&aacute;p l&yacute; như nhau, mỗi
            b&ecirc;n giữ một bản.
            <div className="mt-12 px-32">
                <p className="text-left">
                    <strong>ĐẠI DIỆN BÊN A</strong>
                    <span className="float-right">
                        <strong>ĐẠI DIỆN BÊN B</strong>
                    </span>
                </p>
                <p className="text-left">
                    <strong>{ASignature}</strong>
                    <span className="float-right">
                        <strong>{BSignature}</strong>
                    </span>
                </p>
                <br />
            </div>
        </div>
    )
}
