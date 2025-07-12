import { Phone, Mail, MapPin, Clock } from "lucide-react";

const ContactInfo = () => {
  return (
    <section className="pb-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-500">Informações de Contato</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-gray-500">
            Entre em contato conosco através dos canais abaixo. Estamos sempre prontos para ajudar!
          </p>
        </div>
        
        <div className="flex justify-center md:flex-row flex-col items-center w-full gap-3">
          <div className="bg-card border border-border rounded-lg p-6 max-w-[300px] w-full text-center shadow-sm">
            <Phone className="w-8 h-8 mx-auto mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2 text-gray-500">Telefone</h3>
            <p className="text-muted-foreground mb-2 text-gray-500">(47) 99222-7581</p>
            <p className="text-sm text-muted-foreground text-gray-500">Segunda a Sexta</p>
          </div>


          <div className="bg-card border border-border rounded-lg p-6 max-w-[300px] w-full text-center shadow-sm">
            <Clock className="w-8 h-8 mx-auto mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2 text-gray-500">Horário</h3>
            <p className="text-muted-foreground mb-2 text-gray-500">9h às 18h</p>
            <p className="text-sm text-muted-foreground text-gray-500">Segunda a Sexta</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;