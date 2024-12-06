import React from "react";

function IntroductionAI() {
  return (
    <div className="bg-backgroundPageGradient">
      <div className="mt-3 p-6 max-w-4xl mx-auto text-gray-800 ">
        <h1 className="text-4xl font-bold mb-4 text-center border-b-2 border-fuchsia-600">
          AI Chẩn Đoán Bệnh Lá Cây
        </h1>
        <section className="mb-6">
          <h2 className="text-xl font-semibold">Tổng Quan</h2>
          <p>
            Dự án này sử dụng trí tuệ nhân tạo (AI) để chẩn đoán bệnh lá cây
            thông qua phân tích ảnh. Mô hình xử lý các bộ dữ liệu ảnh lá cây để
            nhận diện và phân loại các bệnh với độ chính xác cao, hỗ trợ nông
            nghiệp thông minh.
          </p>
          <img
            src="https://i.ytimg.com/vi/RRhGRSsiKxQ/maxresdefault.jpg"
            alt="Ảnh minh họa AI phân tích lá cây"
            className="mt-4 mx-auto rounded shadow-lg"
          />
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-semibold">Các Bước Chính</h2>
          <ol className="list-decimal pl-6">
            <li>
              <strong>Chuẩn bị dữ liệu:</strong> Ảnh được chuẩn hóa về phạm vi
              [0, 1], tăng cường dữ liệu, và chia thành hai tập: huấn luyện và
              xác thực.
              <img
                src="https://via.placeholder.com/500x300"
                alt="Ảnh minh họa quá trình chuẩn bị dữ liệu"
                className="mt-2 mx-auto rounded shadow-lg"
              />
            </li>
            <li>
              <strong>Xây dựng mô hình:</strong> Sử dụng mạng nơ-ron tích chập
              (CNN) với các lớp Conv2D, MaxPooling, Dropout, và Dense để xây
              dựng một mô hình hiệu quả và chính xác.
            </li>
            <li>
              <strong>Huấn luyện:</strong> Huấn luyện mô hình qua nhiều vòng
              (epochs) bằng bộ tối ưu Adam và hàm mất mát categorical
              crossentropy.
            </li>
            <li>
              <strong>Đánh giá:</strong> Đánh giá hiệu suất bằng độ chính xác và
              hàm mất mát, đồng thời trực quan hóa qua biểu đồ.
              <img
                src="https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41598-023-34549-2/MediaObjects/41598_2023_34549_Fig4_HTML.png?as=webp"
                alt="Biểu đồ đánh giá hiệu suất mô hình"
                className="mt-2 mx-auto rounded shadow-lg"
              />
            </li>
          </ol>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-semibold">Công Nghệ Sử Dụng</h2>
          <ul className="list-disc pl-6">
            <li>TensorFlow/Keras để xây dựng và huấn luyện mô hình</li>
            <li>Matplotlib để trực quan hóa dữ liệu</li>
            <li>OpenCV để tiền xử lý hình ảnh</li>
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-semibold">Lợi Ích</h2>
          <p>
            Bằng cách tự động hóa việc chẩn đoán bệnh, mô hình AI này giúp nông
            dân đưa ra quyết định kịp thời, giảm tổn thất mùa màng và tối ưu hóa
            việc sử dụng thuốc trừ sâu.
          </p>
          <img
            src="https://via.placeholder.com/500x300"
            alt="Ảnh minh họa nông nghiệp thông minh"
            className="mt-4 mx-auto rounded shadow-lg"
          />
        </section>
      </div>
    </div>
  );
}

export default IntroductionAI;
