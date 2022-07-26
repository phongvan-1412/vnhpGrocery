<div style="width: 600px; margin: 0 auto">
    <div style="text-align:center">
        <h3>Hi {{$newCustomer->customer_name}}</h3>
        <h3>Your account is: {{$newCustomer->customer_email}}</h3>
        <p>Thanks for your interest in joining VNHP Aution! To complete your registration, we need you to verify your email address.</p>
        <p>This is Email verify account. Please click link below to verify your account</p>
        <p>
            <a href="{{route('customer.actived', ['customer_id'=>$newCustomer->customer_id, 'customer_token'=>$newCustomer->customer_token])}}" style="display:inline-block; background: green; color: #fff; padding: 7px 25px; font-weight:bold">Verify Email</a>
        </p>
    </div>
    <h3>Thanks, the VNHP team</h3>
</div>

